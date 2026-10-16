#!/usr/bin/env python3
"""Generates the full SUPPORTED_CURRENCIES array for fermor-backend's currency.constants.ts,
covering every currency in the live exchangeratesapi.io feed except non-fiat/defunct codes
(Bitcoin, gold/silver spot, IMF SDR, an inflation-indexed accounting unit, and currencies
already replaced by a redenominated successor that's also in the feed)."""

LIVE_CODES = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 'STD', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XCD', 'XCG', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'ZMW', 'ZWL']

# Excluded: not fiat currency (BTC, XAU, XAG, XDR), an inflation-indexed accounting unit not a
# spendable currency (CLF), a duplicate offshore quote of CNY (CNH), and pre-redenomination
# currencies whose current successor is already in the list (BYR->BYN, STD->STN, ZMK->ZMW,
# SLL->SLE, LVL/LTL/HRK -> EUR, CUC -> CUP).
EXCLUDE = {'BTC', 'XAU', 'XAG', 'XDR', 'CLF', 'CNH', 'BYR', 'STD', 'ZMK', 'SLL', 'LVL', 'LTL', 'HRK', 'CUC'}

NAMES = {
    'AED': ('UAE Dirham', 'AED'), 'AFN': ('Afghan Afghani', 'AFN'), 'ALL': ('Albanian Lek', 'ALL'),
    'AMD': ('Armenian Dram', 'AMD'), 'ANG': ('Netherlands Antillean Guilder', 'ANG'), 'AOA': ('Angolan Kwanza', 'Kz'),
    'ARS': ('Argentine Peso', 'AR$'), 'AUD': ('Australian Dollar', 'A$'), 'AWG': ('Aruban Florin', 'Afl.'),
    'AZN': ('Azerbaijani Manat', 'AZN'), 'BAM': ('Bosnia-Herzegovina Mark', 'BAM'), 'BBD': ('Barbadian Dollar', 'Bds$'),
    'BDT': ('Bangladeshi Taka', '৳'), 'BGN': ('Bulgarian Lev', 'BGN'), 'BHD': ('Bahraini Dinar', 'BHD'),
    'BIF': ('Burundian Franc', 'FBu'), 'BMD': ('Bermudian Dollar', 'BD$'), 'BND': ('Brunei Dollar', 'B$'),
    'BOB': ('Bolivian Boliviano', 'Bs.'), 'BRL': ('Brazilian Real', 'R$'), 'BSD': ('Bahamian Dollar', 'B$'),
    'BTN': ('Bhutanese Ngultrum', 'Nu.'), 'BWP': ('Botswana Pula', 'P'), 'BYN': ('Belarusian Ruble', 'Br'),
    'BZD': ('Belize Dollar', 'BZ$'), 'CAD': ('Canadian Dollar', 'C$'), 'CDF': ('Congolese Franc', 'FC'),
    'CHF': ('Swiss Franc', 'CHF'), 'CLP': ('Chilean Peso', 'CL$'), 'CNY': ('Chinese Yuan', '¥'),
    'COP': ('Colombian Peso', 'CO$'), 'CRC': ('Costa Rican Colon', '₡'), 'CUP': ('Cuban Peso', 'CUP'),
    'CVE': ('Cape Verdean Escudo', 'CVE'), 'CZK': ('Czech Koruna', 'Kč'), 'DJF': ('Djiboutian Franc', 'Fdj'),
    'DKK': ('Danish Krone', 'kr'), 'DOP': ('Dominican Peso', 'RD$'), 'DZD': ('Algerian Dinar', 'DZD'),
    'EGP': ('Egyptian Pound', 'EGP'), 'ERN': ('Eritrean Nakfa', 'Nfk'), 'ETB': ('Ethiopian Birr', 'Br'),
    'EUR': ('Euro', '€'), 'FJD': ('Fijian Dollar', 'FJ$'), 'FKP': ('Falkland Islands Pound', '£'),
    'GBP': ('British Pound', '£'), 'GEL': ('Georgian Lari', 'GEL'), 'GGP': ('Guernsey Pound', '£'),
    'GHS': ('Ghanaian Cedi', 'GH₵'), 'GIP': ('Gibraltar Pound', '£'), 'GMD': ('Gambian Dalasi', 'GMD'),
    'GNF': ('Guinean Franc', 'GNF'), 'GTQ': ('Guatemalan Quetzal', 'GTQ'), 'GYD': ('Guyanese Dollar', 'GY$'),
    'HKD': ('Hong Kong Dollar', 'HK$'), 'HNL': ('Honduran Lempira', 'HNL'), 'HTG': ('Haitian Gourde', 'HTG'),
    'HUF': ('Hungarian Forint', 'Ft'), 'IDR': ('Indonesian Rupiah', 'Rp'), 'ILS': ('Israeli New Shekel', '₪'),
    'IMP': ('Isle of Man Pound', '£'), 'INR': ('Indian Rupee', '₹'), 'IQD': ('Iraqi Dinar', 'IQD'),
    'IRR': ('Iranian Rial', 'IRR'), 'ISK': ('Icelandic Krona', 'kr'), 'JEP': ('Jersey Pound', '£'),
    'JMD': ('Jamaican Dollar', 'J$'), 'JOD': ('Jordanian Dinar', 'JOD'), 'JPY': ('Japanese Yen', '¥'),
    'KES': ('Kenyan Shilling', 'KSh'), 'KGS': ('Kyrgyzstani Som', 'KGS'), 'KHR': ('Cambodian Riel', 'KHR'),
    'KMF': ('Comorian Franc', 'CF'), 'KPW': ('North Korean Won', '₩'), 'KRW': ('South Korean Won', '₩'),
    'KWD': ('Kuwaiti Dinar', 'KWD'), 'KYD': ('Cayman Islands Dollar', 'CI$'), 'KZT': ('Kazakhstani Tenge', 'KZT'),
    'LAK': ('Lao Kip', 'LAK'), 'LBP': ('Lebanese Pound', 'LBP'), 'LKR': ('Sri Lankan Rupee', 'LKR'),
    'LRD': ('Liberian Dollar', 'L$'), 'LSL': ('Lesotho Loti', 'LSL'), 'LYD': ('Libyan Dinar', 'LYD'),
    'MAD': ('Moroccan Dirham', 'MAD'), 'MDL': ('Moldovan Leu', 'MDL'), 'MGA': ('Malagasy Ariary', 'MGA'),
    'MKD': ('Macedonian Denar', 'MKD'), 'MMK': ('Myanmar Kyat', 'MMK'), 'MNT': ('Mongolian Togrog', 'MNT'),
    'MOP': ('Macanese Pataca', 'MOP'), 'MRU': ('Mauritanian Ouguiya', 'MRU'), 'MUR': ('Mauritian Rupee', 'MUR'),
    'MVR': ('Maldivian Rufiyaa', 'MVR'), 'MWK': ('Malawian Kwacha', 'MWK'), 'MXN': ('Mexican Peso', 'MX$'),
    'MYR': ('Malaysian Ringgit', 'RM'), 'MZN': ('Mozambican Metical', 'MZN'), 'NAD': ('Namibian Dollar', 'N$'),
    'NGN': ('Nigerian Naira', '₦'), 'NIO': ('Nicaraguan Cordoba', 'NIO'), 'NOK': ('Norwegian Krone', 'kr'),
    'NPR': ('Nepalese Rupee', 'NPR'), 'NZD': ('New Zealand Dollar', 'NZ$'), 'OMR': ('Omani Rial', 'OMR'),
    'PAB': ('Panamanian Balboa', 'PAB'), 'PEN': ('Peruvian Sol', 'S/'), 'PGK': ('Papua New Guinean Kina', 'PGK'),
    'PHP': ('Philippine Peso', '₱'), 'PKR': ('Pakistani Rupee', 'PKR'), 'PLN': ('Polish Zloty', 'zł'),
    'PYG': ('Paraguayan Guarani', '₲'), 'QAR': ('Qatari Riyal', 'QAR'), 'RON': ('Romanian Leu', 'RON'),
    'RSD': ('Serbian Dinar', 'RSD'), 'RUB': ('Russian Ruble', '₽'), 'RWF': ('Rwandan Franc', 'RWF'),
    'SAR': ('Saudi Riyal', 'SAR'), 'SBD': ('Solomon Islands Dollar', 'SI$'), 'SCR': ('Seychellois Rupee', 'SCR'),
    'SDG': ('Sudanese Pound', 'SDG'), 'SEK': ('Swedish Krona', 'kr'), 'SGD': ('Singapore Dollar', 'S$'),
    'SHP': ('Saint Helena Pound', '£'), 'SLE': ('Sierra Leonean Leone', 'SLE'), 'SOS': ('Somali Shilling', 'SOS'),
    'SRD': ('Surinamese Dollar', 'SRD'), 'STN': ('Sao Tome Dobra', 'STN'), 'SVC': ('Salvadoran Colon', 'SVC'),
    'SYP': ('Syrian Pound', 'SYP'), 'SZL': ('Eswatini Lilangeni', 'SZL'), 'THB': ('Thai Baht', '฿'),
    'TJS': ('Tajikistani Somoni', 'TJS'), 'TMT': ('Turkmenistani Manat', 'TMT'), 'TND': ('Tunisian Dinar', 'TND'),
    'TOP': ('Tongan Pa\'anga', 'TOP'), 'TRY': ('Turkish Lira', '₺'), 'TTD': ('Trinidad & Tobago Dollar', 'TT$'),
    'TWD': ('New Taiwan Dollar', 'NT$'), 'TZS': ('Tanzanian Shilling', 'TZS'), 'UAH': ('Ukrainian Hryvnia', '₴'),
    'UGX': ('Ugandan Shilling', 'USh'), 'USD': ('US Dollar', '$'), 'UYU': ('Uruguayan Peso', 'UY$'),
    'UZS': ('Uzbekistani Som', 'UZS'), 'VES': ('Venezuelan Bolivar', 'VES'), 'VND': ('Vietnamese Dong', '₫'),
    'VUV': ('Vanuatu Vatu', 'VUV'), 'WST': ('Samoan Tala', 'WST'), 'XAF': ('Central African CFA Franc', 'FCFA'),
    'XCD': ('East Caribbean Dollar', 'EC$'), 'XCG': ('Caribbean Guilder', 'XCG'), 'XOF': ('West African CFA Franc', 'CFA'),
    'XPF': ('CFP Franc', 'XPF'), 'YER': ('Yemeni Rial', 'YER'), 'ZAR': ('South African Rand', 'R'),
    'ZMW': ('Zambian Kwacha', 'ZK'), 'ZWL': ('Zimbabwean Dollar', 'Z$'),
}

def main():
    final = sorted(set(LIVE_CODES) - EXCLUDE)
    lines = []
    for code in final:
        if code not in NAMES:
            print(f"WARNING: no name/symbol for {code}, skipping")
            continue
        name, symbol = NAMES[code]
        lines.append(f'  {{ code: "{code}", symbol: "{symbol}", name: "{name}" }},')

    print(f"Total: {len(lines)} currencies")
    out = "export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [\n" + "\n".join(lines) + "\n];\n"
    with open("/private/tmp/claude-503/-Users-naveen-reddy-fermor-projects/24e0c1f7-7f97-46bd-94a9-211f778c1385/scratchpad/full_currencies.ts", "w") as f:
        f.write(out)

if __name__ == "__main__":
    main()
