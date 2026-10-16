#!/usr/bin/env python3
"""Generates app/gdp/_template/countryCurrency.ts — ISO3 -> official local currency, for the
per-country "in local currency" conversion line. Verified against the live exchangeratesapi.io
currency list (172 codes) before use; countries whose currency isn't in that list are omitted
entirely rather than guessed, so the page can gracefully skip the line instead of showing 'N/A'.
"""
import json

# code -> (name, symbol). symbol falls back to the code itself when there's no unambiguous glyph.
CURRENCY_INFO = {
    "AWG": ("Aruban Florin", "Afl."), "AFN": ("Afghan Afghani", "AFN"), "AOA": ("Angolan Kwanza", "Kz"),
    "ALL": ("Albanian Lek", "ALL"), "EUR": ("Euro", "€"), "AED": ("UAE Dirham", "AED"),
    "ARS": ("Argentine Peso", "AR$"), "AMD": ("Armenian Dram", "AMD"), "XCD": ("East Caribbean Dollar", "EC$"),
    "AUD": ("Australian Dollar", "A$"), "AZN": ("Azerbaijani Manat", "AZN"), "BIF": ("Burundian Franc", "FBu"),
    "XOF": ("West African CFA Franc", "CFA"), "BDT": ("Bangladeshi Taka", "৳"), "BGN": ("Bulgarian Lev", "BGN"),
    "BHD": ("Bahraini Dinar", "BHD"), "BSD": ("Bahamian Dollar", "B$"), "BAM": ("Bosnia-Herzegovina Mark", "BAM"),
    "BYN": ("Belarusian Ruble", "Br"), "BZD": ("Belize Dollar", "BZ$"), "BOB": ("Bolivian Boliviano", "Bs."),
    "BRL": ("Brazilian Real", "R$"), "BBD": ("Barbadian Dollar", "Bds$"), "BND": ("Brunei Dollar", "B$"),
    "BTN": ("Bhutanese Ngultrum", "Nu."), "BWP": ("Botswana Pula", "P"), "XAF": ("Central African CFA Franc", "FCFA"),
    "CAD": ("Canadian Dollar", "C$"), "CHF": ("Swiss Franc", "CHF"), "CLP": ("Chilean Peso", "CL$"),
    "CNY": ("Chinese Yuan", "¥"), "COP": ("Colombian Peso", "CO$"), "KMF": ("Comorian Franc", "CF"),
    "CVE": ("Cape Verdean Escudo", "CVE"), "CRC": ("Costa Rican Colon", "₡"), "CZK": ("Czech Koruna", "Kč"),
    "DJF": ("Djiboutian Franc", "Fdj"), "DKK": ("Danish Krone", "kr"), "DOP": ("Dominican Peso", "RD$"),
    "DZD": ("Algerian Dinar", "DZD"), "USD": ("US Dollar", "$"), "EGP": ("Egyptian Pound", "EGP"),
    "ERN": ("Eritrean Nakfa", "Nfk"), "ETB": ("Ethiopian Birr", "Br"), "FJD": ("Fijian Dollar", "FJ$"),
    "GEL": ("Georgian Lari", "GEL"), "GHS": ("Ghanaian Cedi", "GH₵"), "GNF": ("Guinean Franc", "GNF"),
    "GMD": ("Gambian Dalasi", "GMD"), "GBP": ("British Pound", "£"), "GTQ": ("Guatemalan Quetzal", "GTQ"),
    "GYD": ("Guyanese Dollar", "GY$"), "HKD": ("Hong Kong Dollar", "HK$"), "HNL": ("Honduran Lempira", "HNL"),
    "HTG": ("Haitian Gourde", "HTG"), "HUF": ("Hungarian Forint", "Ft"), "IDR": ("Indonesian Rupiah", "Rp"),
    "INR": ("Indian Rupee", "₹"), "IRR": ("Iranian Rial", "IRR"), "IQD": ("Iraqi Dinar", "IQD"),
    "ISK": ("Icelandic Krona", "kr"), "ILS": ("Israeli New Shekel", "₪"), "JMD": ("Jamaican Dollar", "J$"),
    "JOD": ("Jordanian Dinar", "JOD"), "JPY": ("Japanese Yen", "¥"), "KZT": ("Kazakhstani Tenge", "KZT"),
    "KES": ("Kenyan Shilling", "KSh"), "KGS": ("Kyrgyzstani Som", "KGS"), "KHR": ("Cambodian Riel", "KHR"),
    "KWD": ("Kuwaiti Dinar", "KWD"), "LAK": ("Lao Kip", "LAK"), "LBP": ("Lebanese Pound", "LBP"),
    "LRD": ("Liberian Dollar", "L$"), "LYD": ("Libyan Dinar", "LYD"), "LKR": ("Sri Lankan Rupee", "LKR"),
    "LSL": ("Lesotho Loti", "LSL"), "MOP": ("Macanese Pataca", "MOP"), "MAD": ("Moroccan Dirham", "MAD"),
    "MDL": ("Moldovan Leu", "MDL"), "MGA": ("Malagasy Ariary", "MGA"), "MVR": ("Maldivian Rufiyaa", "MVR"),
    "MXN": ("Mexican Peso", "MX$"), "MKD": ("Macedonian Denar", "MKD"), "MMK": ("Myanmar Kyat", "MMK"),
    "MNT": ("Mongolian Togrog", "MNT"), "MZN": ("Mozambican Metical", "MZN"), "MRU": ("Mauritanian Ouguiya", "MRU"),
    "MUR": ("Mauritian Rupee", "MUR"), "MWK": ("Malawian Kwacha", "MWK"), "MYR": ("Malaysian Ringgit", "RM"),
    "NAD": ("Namibian Dollar", "N$"), "NGN": ("Nigerian Naira", "₦"), "NIO": ("Nicaraguan Cordoba", "NIO"),
    "NOK": ("Norwegian Krone", "kr"), "NPR": ("Nepalese Rupee", "NPR"), "NZD": ("New Zealand Dollar", "NZ$"),
    "OMR": ("Omani Rial", "OMR"), "PKR": ("Pakistani Rupee", "PKR"), "PAB": ("Panamanian Balboa", "PAB"),
    "PEN": ("Peruvian Sol", "S/"), "PHP": ("Philippine Peso", "₱"), "PGK": ("Papua New Guinean Kina", "PGK"),
    "PLN": ("Polish Zloty", "zł"), "PYG": ("Paraguayan Guarani", "₲"), "QAR": ("Qatari Riyal", "QAR"),
    "RON": ("Romanian Leu", "RON"), "RUB": ("Russian Ruble", "₽"), "RWF": ("Rwandan Franc", "RWF"),
    "SAR": ("Saudi Riyal", "SAR"), "SDG": ("Sudanese Pound", "SDG"), "SGD": ("Singapore Dollar", "S$"),
    "SBD": ("Solomon Islands Dollar", "SI$"), "SLE": ("Sierra Leonean Leone", "SLE"), "SOS": ("Somali Shilling", "SOS"),
    "RSD": ("Serbian Dinar", "RSD"), "STN": ("Sao Tome Dobra", "STN"), "SRD": ("Surinamese Dollar", "SRD"),
    "SEK": ("Swedish Krona", "kr"), "SZL": ("Eswatini Lilangeni", "SZL"), "SCR": ("Seychellois Rupee", "SCR"),
    "SYP": ("Syrian Pound", "SYP"), "THB": ("Thai Baht", "฿"), "TJS": ("Tajikistani Somoni", "TJS"),
    "TMT": ("Turkmenistani Manat", "TMT"), "TOP": ("Tongan Pa'anga", "TOP"), "TTD": ("Trinidad & Tobago Dollar", "TT$"),
    "TND": ("Tunisian Dinar", "TND"), "TRY": ("Turkish Lira", "₺"), "TWD": ("New Taiwan Dollar", "NT$"),
    "TZS": ("Tanzanian Shilling", "TZS"), "UAH": ("Ukrainian Hryvnia", "₴"), "UYU": ("Uruguayan Peso", "UY$"),
    "UZS": ("Uzbekistani Som", "UZS"), "VES": ("Venezuelan Bolivar", "VES"), "VND": ("Vietnamese Dong", "₫"),
    "VUV": ("Vanuatu Vatu", "VUV"), "WST": ("Samoan Tala", "WST"), "YER": ("Yemeni Rial", "YER"),
    "ZAR": ("South African Rand", "R"), "ZMW": ("Zambian Kwacha", "ZK"), "ZWL": ("Zimbabwean Dollar", "Z$"),
    "CDF": ("Congolese Franc", "FC"), "KRW": ("South Korean Won", "₩"), "UGX": ("Ugandan Shilling", "USh"),
}

# ISO3 country code (as used in the generated GDP pages) -> currency code. Only includes
# countries where the currency is confirmed present in CURRENCY_INFO above (i.e. verified live).
ISO3_TO_CURRENCY = {
    "ABW": "AWG", "AFG": "AFN", "AGO": "AOA", "ALB": "ALL", "AND": "EUR", "ARE": "AED", "ARG": "ARS",
    "ARM": "AMD", "ATG": "XCD", "AUS": "AUD", "AUT": "EUR", "AZE": "AZN", "BDI": "BIF", "BEL": "EUR",
    "BEN": "XOF", "BFA": "XOF", "BGD": "BDT", "BGR": "BGN", "BHR": "BHD", "BHS": "BSD", "BIH": "BAM",
    "BLR": "BYN", "BLZ": "BZD", "BOL": "BOB", "BRA": "BRL", "BRB": "BBD", "BRN": "BND", "BTN": "BTN",
    "BWA": "BWP", "CAF": "XAF", "CAN": "CAD", "CHE": "CHF", "CHL": "CLP", "CHN": "CNY", "CIV": "XOF",
    "CMR": "XAF", "COD": "CDF", "COG": "XAF", "COL": "COP", "COM": "KMF", "CPV": "CVE", "CRI": "CRC",
    "CYP": "EUR", "CZE": "CZK", "DEU": "EUR", "DJI": "DJF", "DMA": "XCD", "DNK": "DKK", "DOM": "DOP",
    "DZA": "DZD", "ECU": "USD", "EGY": "EGP", "ERI": "ERN", "ESP": "EUR", "EST": "EUR", "ETH": "ETB",
    "FIN": "EUR", "FJI": "FJD", "FRA": "EUR", "FSM": "USD", "GAB": "XAF", "GBR": "GBP", "GEO": "GEL",
    "GHA": "GHS", "GIN": "GNF", "GMB": "GMD", "GNB": "XOF", "GNQ": "XAF", "GRC": "EUR", "GRD": "XCD",
    "GTM": "GTQ", "GUY": "GYD", "HKG": "HKD", "HND": "HNL", "HRV": "EUR", "HTI": "HTG", "HUN": "HUF",
    "IDN": "IDR", "IND": "INR", "IRL": "EUR", "IRN": "IRR", "IRQ": "IQD", "ISL": "ISK", "ISR": "ILS",
    "ITA": "EUR", "JAM": "JMD", "JOR": "JOD", "JPN": "JPY", "KAZ": "KZT", "KEN": "KES", "KGZ": "KGS",
    "KHM": "KHR", "KIR": "AUD", "KNA": "XCD", "KOR": "KRW", "KWT": "KWD", "LAO": "LAK", "LBN": "LBP",
    "LBR": "LRD", "LBY": "LYD", "LCA": "XCD", "LIE": "CHF", "LKA": "LKR", "LSO": "LSL", "LTU": "EUR",
    "LUX": "EUR", "LVA": "EUR", "MAC": "MOP", "MAR": "MAD", "MDA": "MDL", "MDG": "MGA", "MDV": "MVR",
    "MEX": "MXN", "MHL": "USD", "MKD": "MKD", "MLI": "XOF", "MLT": "EUR", "MMR": "MMK", "MNE": "EUR",
    "MNG": "MNT", "MOZ": "MZN", "MRT": "MRU", "MUS": "MUR", "MWI": "MWK", "MYS": "MYR", "NAM": "NAD",
    "NER": "XOF", "NGA": "NGN", "NIC": "NIO", "NLD": "EUR", "NOR": "NOK", "NPL": "NPR", "NRU": "AUD",
    "NZL": "NZD", "OMN": "OMR", "PAK": "PKR", "PAN": "PAB", "PER": "PEN", "PHL": "PHP", "PLW": "USD",
    "PNG": "PGK", "POL": "PLN", "PRI": "USD", "PRT": "EUR", "PRY": "PYG", "QAT": "QAR", "ROU": "RON",
    "RUS": "RUB", "RWA": "RWF", "SAU": "SAR", "SDN": "SDG", "SEN": "XOF", "SGP": "SGD", "SLB": "SBD",
    "SLE": "SLE", "SLV": "USD", "SMR": "EUR", "SOM": "SOS", "SRB": "RSD", "STP": "STN", "SUR": "SRD",
    "SVK": "EUR", "SVN": "EUR", "SWE": "SEK", "SWZ": "SZL", "SYC": "SCR", "SYR": "SYP", "TCD": "XAF",
    "TGO": "XOF", "THA": "THB", "TJK": "TJS", "TKM": "TMT", "TLS": "USD", "TON": "TOP", "TTO": "TTD",
    "TUN": "TND", "TUR": "TRY", "TUV": "AUD", "TWN": "TWD", "TZA": "TZS", "UGA": "UGX", "UKR": "UAH",
    "URY": "UYU", "USA": "USD", "UZB": "UZS", "VCT": "XCD", "VEN": "VES", "VNM": "VND", "VUT": "VUV",
    "WSM": "WST", "YEM": "YER", "ZAF": "ZAR", "ZMB": "ZMW", "ZWE": "ZWL",
    # Confirmed NOT present in the live exchangeratesapi.io list — omitted rather than guessed:
    # SSD (South Sudan Pound, SSP not tracked), WBG (Palestine, uses ILS/JOD but ambiguous enough to skip).
}

def main():
    entries = []
    for iso3, code in sorted(ISO3_TO_CURRENCY.items()):
        if code not in CURRENCY_INFO:
            print(f"WARNING: {iso3} -> {code} has no CURRENCY_INFO entry, skipping")
            continue
        name, symbol = CURRENCY_INFO[code]
        entries.append(f'  {iso3}: {{ code: "{code}", name: "{name}", symbol: "{symbol}" }},')

    content = """// Official local currency per country, keyed by ISO3 (matches CountryGDPData.iso3).
// Used by LocalCurrencyConversionLine to show each country's GDP in its own currency, alongside
// the India-focused INR line. Countries whose currency isn't tracked by the live rate feed are
// simply absent here — the component skips the line rather than showing a fabricated figure.
export interface CurrencyMeta { code: string; name: string; symbol: string; }

export const COUNTRY_CURRENCY: Record<string, CurrencyMeta> = {
""" + "\n".join(entries) + """
};
"""
    out_path = "/Users/naveen.reddy/fermor-projects/fermor-web/app/gdp/_template/countryCurrency.ts"
    with open(out_path, "w") as f:
        f.write(content)
    print(f"Wrote {len(entries)} currency mappings to {out_path}")

if __name__ == "__main__":
    main()
