export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface CurrencyData {
  baseCurrency: string;
  lastUpdated: string;
  rates: ExchangeRates;
}
