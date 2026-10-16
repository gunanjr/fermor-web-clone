#!/usr/bin/env python3
"""
Generates app/gdp/{slug}/page.tsx for every country in GDP_DATA_FULL that has real IMF
DataMapper time-series data available in the six source JSON files. Never fabricates data:
a country with no matching IMF series is skipped and reported, not filled in with guesses.
"""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = Path("/Users/naveen.reddy/fermor-projects")
GDP_DIR = ROOT / "app" / "gdp"
GDPDATA_TS = ROOT / "app" / "news" / "world-gdp-ranking-2026" / "gdpData.ts"

DATE_NOW = "2026-07-06T23:25:40+05:30"

# ISO3 -> ISO2, used to compute flag emoji (regional indicator symbols). Static ISO 3166-1 data,
# not something that changes, so no live verification needed the way a price or rate would.
ISO3_TO_ISO2 = {
"AFG":"AF","ALB":"AL","DZA":"DZ","AND":"AD","AGO":"AO","ATG":"AG","ARG":"AR","ARM":"AM","ABW":"AW",
"AUS":"AU","AUT":"AT","AZE":"AZ","BHS":"BS","BHR":"BH","BGD":"BD","BRB":"BB","BLR":"BY","BEL":"BE",
"BLZ":"BZ","BEN":"BJ","BMU":"BM","BTN":"BT","BOL":"BO","BIH":"BA","BWA":"BW","BRA":"BR","VGB":"VG",
"BRN":"BN","BGR":"BG","BFA":"BF","BDI":"BI","CPV":"CV","KHM":"KH","CMR":"CM","CAN":"CA","CYM":"KY",
"CAF":"CF","TCD":"TD","CHL":"CL","CHN":"CN","COL":"CO","COM":"KM","COD":"CD","COG":"CG","COK":"CK",
"CRI":"CR","CIV":"CI","HRV":"HR","CUB":"CU","CUW":"CW","CYP":"CY","CZE":"CZ","DNK":"DK","DJI":"DJ",
"DMA":"DM","DOM":"DO","ECU":"EC","EGY":"EG","SLV":"SV","GNQ":"GQ","ERI":"ER","EST":"EE","SWZ":"SZ",
"ETH":"ET","FRO":"FO","FJI":"FJ","FIN":"FI","FRA":"FR","PYF":"PF","GAB":"GA","GMB":"GM","GEO":"GE",
"DEU":"DE","GHA":"GH","GIB":"GI","GRC":"GR","GRL":"GL","GRD":"GD","GUM":"GU","GTM":"GT","GIN":"GN",
"GNB":"GW","GUY":"GY","HTI":"HT","HND":"HN","HKG":"HK","HUN":"HU","ISL":"IS","IND":"IN","IDN":"ID",
"IRN":"IR","IRQ":"IQ","IRL":"IE","ISR":"IL","ITA":"IT","JAM":"JM","JPN":"JP","JOR":"JO","KAZ":"KZ",
"KEN":"KE","KIR":"KI","KWT":"KW","KGZ":"KG","LAO":"LA","LVA":"LV","LBN":"LB","LSO":"LS","LBR":"LR",
"LBY":"LY","LIE":"LI","LTU":"LT","LUX":"LU","MAC":"MO","MDG":"MG","MWI":"MW","MYS":"MY","MDV":"MV",
"MLI":"ML","MLT":"MT","MHL":"MH","MRT":"MR","MUS":"MU","MEX":"MX","FSM":"FM","MDA":"MD","MCO":"MC",
"MNG":"MN","MNE":"ME","MSR":"MS","MAR":"MA","MOZ":"MZ","MMR":"MM","NAM":"NA","NRU":"NR","NPL":"NP",
"NLD":"NL","NCL":"NC","NZL":"NZ","NIC":"NI","NER":"NE","NGA":"NG","MNP":"MP","NOR":"NO","OMN":"OM",
"PAK":"PK","PLW":"PW","PAN":"PA","PNG":"PG","PRY":"PY","PER":"PE","PHL":"PH","POL":"PL","PRT":"PT",
"PRI":"PR","QAT":"QA","ROU":"RO","RUS":"RU","RWA":"RW","KNA":"KN","LCA":"LC","MAF":"MF","VCT":"VC",
"WSM":"WS","SMR":"SM","STP":"ST","SAU":"SA","SEN":"SN","SRB":"RS","SYC":"SC","SLE":"SL","SGP":"SG",
"SXM":"SX","SVK":"SK","SVN":"SI","SLB":"SB","SOM":"SO","ZAF":"ZA","KOR":"KR","SSD":"SS","ESP":"ES",
"LKA":"LK","SDN":"SD","SUR":"SR","SWE":"SE","CHE":"CH","SYR":"SY","TWN":"TW","TJK":"TJ","TZA":"TZ",
"THA":"TH","TLS":"TL","TGO":"TG","TON":"TO","TTO":"TT","TUN":"TN","TUR":"TR","TKM":"TM","TCA":"TC",
"TUV":"TV","UGA":"UG","UKR":"UA","ARE":"AE","GBR":"GB","USA":"US","URY":"UY","UZB":"UZ","VUT":"VU",
"VEN":"VE","VNM":"VN","YEM":"YE","ZMB":"ZM","ZWE":"ZW","ASM":"AS","XKX":"XK","AIA":"AI",
}

# Known name mismatches between GDP_DATA_FULL's display names and IMF countries.json labels.
# Verified against actual NGDPD.json contents before use, not guessed: every non-None value here
# was checked to have real IMF time-series data behind it. `None` means confirmed no IMF series
# exists (these are the World Bank/UN-sourced "note" rows in GDP_DATA_FULL) — skipped, not faked.
NAME_OVERRIDES = {
    "South Korea": "Korea, Republic of", "Czech Republic (Czechia)": "Czech Republic",
    "Turkey": "Türkiye, Republic of", "Russia": "Russian Federation", "Hong Kong": "Hong Kong SAR",
    "Macao": "Macao SAR", "Taiwan": "Taiwan Province of China",
    "Laos": "Lao P.D.R.", "Ivory Coast": "Côte d'Ivoire", "Cape Verde": "Cabo Verde",
    "Democratic Republic of the Congo": "Congo, Dem. Rep. of the", "Republic of the Congo": "Congo, Republic of",
    "Brunei": "Brunei Darussalam", "China": "China, People's Republic of",
    "North Korea": None,  # PRK has no NGDPD series
    "Kyrgyzstan": "Kyrgyz Republic", "Slovakia": "Slovak Republic",
    "Micronesia": "Micronesia, Fed. States of", "St. Vincent & Grenadines": "Saint Vincent and the Grenadines",
    "Saint Kitts & Nevis": "Saint Kitts and Nevis",
    "Sao Tome & Principe": "São Tomé and Príncipe", "Bahamas": "Bahamas, The",
    "Gambia": "Gambia, The", "South Sudan": "South Sudan, Republic of",
    "State of Palestine": "West Bank and Gaza",
    "Cuba": None, "New Caledonia": None, "Monaco": None, "Bermuda": None, "Isle of Man": None,
    "Cayman Islands": None, "Guam": None, "French Polynesia": None, "Faeroe Islands": None,
    "Greenland": None, "Curaçao": None, "Turks and Caicos": None, "Sint Maarten": None,
    "British Virgin Islands": None, "Saint Martin": None, "Cook Islands": None, "Montserrat": None,
    "Northern Mariana Islands": None, "American Samoa": None, "U.S. Virgin Islands": None,
    "Eritrea": "Eritrea", "Pakistan": "Pakistan", "Congo": "Congo, Republic of",
    "DR Congo": "Congo, Dem. Rep. of the", "Czechia": "Czech Republic",
}

def slugify(name: str) -> str:
    n = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    n = n.lower()
    n = re.sub(r"[^a-z0-9]+", "-", n)
    return n.strip("-")

def normalize(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", s.lower())

def flag_emoji(iso2: str) -> str:
    return "".join(chr(0x1F1E6 + ord(c) - ord("A")) for c in iso2.upper())

def load_json(name):
    return json.load(open(SRC / name))

def parse_gdp_data_full():
    text = GDPDATA_TS.read_text()
    rows = []
    for m in re.finditer(r"\{\s*rank:\s*(\d+),\s*country:\s*\"([^\"]+)\".*?region:\s*\"([^\"]+)\"", text):
        rows.append({"rank": int(m.group(1)), "country": m.group(2), "region": m.group(3)})
    return rows

def main():
    countries = load_json("countries.json")["countries"]
    label_to_iso3 = {}
    for iso3, info in countries.items():
        if not info.get("label"):
            continue
        label_to_iso3[normalize(info["label"])] = iso3

    NGDPD = load_json("NGDPD.json")["values"]["NGDPD"]
    NGDP_RPCH = load_json("NGDP_RPCH.json")["values"]["NGDP_RPCH"]
    NGDPDPC = load_json("NGDPDPC.json")["values"]["NGDPDPC"]
    PPPGDP = load_json("PPPGDP.json")["values"]["PPPGDP"]
    PPPPC = load_json("PPPPC.json")["values"]["PPPPC"]
    LP = load_json("LP.json")["values"]["LP"]

    gdp_rows = parse_gdp_data_full()
    by_rank = {r["rank"]: r for r in gdp_rows}

    matched, unmatched = [], []
    for row in gdp_rows:
        name = row["country"]
        override = NAME_OVERRIDES.get(name, name)
        if override is None:
            unmatched.append(name)
            continue
        iso3 = label_to_iso3.get(normalize(override))
        if not iso3 or iso3 not in NGDPD:
            unmatched.append(name)
            continue
        row["iso3"] = iso3
        matched.append(row)

    print(f"Matched {len(matched)} / {len(gdp_rows)} countries to IMF data.")
    print("Unmatched (will be skipped, not fabricated):", unmatched)

    # Precompute which slugs will actually get a page (enough history) before assigning
    # neighbors, so a country never links to a rank-adjacent page that doesn't exist.
    existing_slugs = {"united-states"}
    will_write = {}
    for row in matched:
        iso3 = row["iso3"]
        years = sorted(int(y) for y in NGDPD.get(iso3, {}).keys())
        hist_years = [y for y in years if y <= 2026]
        if len(hist_years) < 5:
            continue
        slug = slugify(row["country"])
        will_write[row["rank"]] = slug
        existing_slugs.add(slug)

    GDP_DIR.mkdir(exist_ok=True)
    written, skipped_no_data = [], []

    for row in matched:
        name, iso3, rank, region = row["country"], row["iso3"], row["rank"], row["region"]
        slug = slugify(name)
        if slug == "united-states":
            continue  # already hand-built with a calc override

        years = sorted(int(y) for y in NGDPD.get(iso3, {}).keys())
        hist_years = [y for y in years if y <= 2026]
        proj_years = [y for y in years if y > 2026]
        if len(hist_years) < 5:
            skipped_no_data.append(name)
            continue

        def build_row(y, gdp_key, ppp=False):
            gdp = NGDPD[iso3].get(str(y)) if not ppp else PPPGDP.get(iso3, {}).get(str(y))
            if gdp is None:
                return None
            if not ppp:
                growth = NGDP_RPCH.get(iso3, {}).get(str(y))
                pc = NGDPDPC.get(iso3, {}).get(str(y))
                pop_prev = LP.get(iso3, {}).get(str(y - 1))
                pop_cur = LP.get(iso3, {}).get(str(y))
                pop_chg = round((pop_cur - pop_prev) / pop_prev * 100, 2) if pop_prev and pop_cur else None
                return {"year": y, "gdp": round(gdp, 3), "growth": growth, "perCapita": round(pc, 1) if pc else None, "popChangePct": pop_chg}
            else:
                pc = PPPPC.get(iso3, {}).get(str(y))
                pc_prev = PPPPC.get(iso3, {}).get(str(y - 1))
                pc_chg = round((pc - pc_prev) / pc_prev * 100, 2) if pc and pc_prev else None
                pop_prev = LP.get(iso3, {}).get(str(y - 1))
                pop_cur = LP.get(iso3, {}).get(str(y))
                pop_chg = round((pop_cur - pop_prev) / pop_prev * 100, 2) if pop_prev and pop_cur else None
                return {"year": y, "gdpPPP": round(gdp, 3), "perCapitaPPP": round(pc, 1) if pc else None, "perCapitaPPPChangePct": pc_chg, "popChangePct": pop_chg}

        history = [r for y in hist_years if (r := build_row(y, "gdp"))]
        projections = [r for y in proj_years if (r := build_row(y, "gdp"))]
        ppp_history = [r for y in hist_years if (r := build_row(y, "gdp", ppp=True))]
        ppp_projections = [r for y in proj_years if (r := build_row(y, "gdp", ppp=True))]

        if not history:
            skipped_no_data.append(name)
            continue

        # Search outward in each direction until an actually-existing page is found, rather than
        # only checking exactly rank-1/rank+1 — a skipped neighbor (no IMF data) would otherwise
        # leave a broken link or a silent gap in the "nearby economies" section.
        neighbors = []
        for step in (-1, 1):
            nrank = rank + step
            while nrank in by_rank:
                nb_slug = will_write.get(nrank)
                if nb_slug and nb_slug in existing_slugs:
                    neighbors.append({"name": by_rank[nrank]["country"], "slug": nb_slug, "rank": nrank})
                    break
                nrank += step

        iso2 = ISO3_TO_ISO2.get(iso3)
        flag = flag_emoji(iso2) if iso2 else "🏳️"

        data = {
            "name": name, "slug": slug, "iso3": iso3, "region": region, "rank2026": rank,
            "flagEmoji": flag, "datePublished": DATE_NOW, "dateModified": DATE_NOW,
            "neighbors": neighbors, "history": history, "projections": projections,
            "pppHistory": ppp_history, "pppProjections": ppp_projections,
        }

        page_dir = GDP_DIR / slug
        page_dir.mkdir(exist_ok=True)
        json_str = json.dumps(data, indent=2, ensure_ascii=False)
        # JSON -> valid TS object literal: quote keys need no change (TS accepts "key": value),
        # but Prettier-less raw JSON.stringify output is valid TS as long as there are no
        # functions/undefined, which there aren't here.
        func_name = "".join(w.capitalize() for w in re.sub(r"[^a-zA-Z0-9]+", " ", name).split()) + "GDPPage"
        content = f"""import CountryGDPPageTemplate from '../_template/CountryGDPPageTemplate';
import {{ buildGDPMetadata }} from '../_template/buildMetadata';
import type {{ CountryGDPData }} from '../_template/country-types';

const DATA: CountryGDPData = {json_str};

export const metadata = buildGDPMetadata(DATA);

export default function {func_name}() {{
  return <CountryGDPPageTemplate data={{DATA}} />;
}}
"""
        (page_dir / "page.tsx").write_text(content)
        written.append(slug)

    print(f"\nWritten: {len(written)} pages")
    print(f"Skipped (matched country, but insufficient IMF history): {skipped_no_data}")
    print(f"Total unmatched (no IMF series at all): {len(unmatched)}")

if __name__ == "__main__":
    main()
