'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CurrencyData, CurrencyInfo } from '../types/currency';
import { currencyService } from '../services/currencyService';
import { formatCurrencyAmount } from '../utils/currencyFormatter';

interface CurrencyContextType {
  selectedCurrency: CurrencyInfo;
  supportedCurrencies: CurrencyInfo[];
  rates: CurrencyData | null;
  loading: boolean;
  error: Error | null;
  setSelectedCurrency: (currency: CurrencyInfo) => void;
  convertCurrency: (amountInBase: number) => number;
  formatCurrency: (amount: number, useCrL?: boolean) => string;
  refreshRates: () => Promise<void>;
}

const defaultCurrency: CurrencyInfo = { code: "INR", symbol: "₹", name: "Indian Rupee" };

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

import { usePathname } from 'next/navigation';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrencyState] = useState<CurrencyInfo>(defaultCurrency);
  const [supportedCurrencies, setSupportedCurrencies] = useState<CurrencyInfo[]>([]);
  const [rates, setRates] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initial load
    refreshRates();
  }, []);

  useEffect(() => {
    let defaultCode = "INR";
    const parts = pathname.split('/');
    if (parts.length >= 2) {
      const REGION_CURRENCY_MAP: Record<string, string> = {
        us: 'USD',
        uk: 'GBP',
        uae: 'AED',
        singapore: 'SGD',
        canada: 'CAD',
        australia: 'AUD'
      };
      
      let region = '';
      if (parts.length >= 4 && parts[1] === 'calculators' && REGION_CURRENCY_MAP[parts[2].toLowerCase()]) {
        region = parts[2].toLowerCase();
      } else if (REGION_CURRENCY_MAP[parts[1].toLowerCase()]) {
        region = parts[1].toLowerCase();
      }

      if (region && REGION_CURRENCY_MAP[region]) {
        defaultCode = REGION_CURRENCY_MAP[region];
      }
    }
    
    if (supportedCurrencies.length > 0) {
      const cInfo = supportedCurrencies.find(c => c.code === defaultCode);
      setSelectedCurrencyState(cInfo || defaultCurrency);
    } else {
      setSelectedCurrencyState({ code: defaultCode, symbol: defaultCode === 'INR' ? '₹' : '$', name: '' });
    }
  }, [pathname, supportedCurrencies]);

  const refreshRates = async () => {
    setLoading(true);
    try {
      const [fetchedRates, fetchedSupported] = await Promise.all([
        currencyService.getRates(),
        currencyService.getSupportedCurrencies(),
      ]);
      setRates(fetchedRates);
      setSupportedCurrencies(fetchedSupported);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error fetching rates"));
    } finally {
      setLoading(false);
    }
  };

  const setSelectedCurrency = (currency: CurrencyInfo) => {
    setSelectedCurrencyState(currency);
  };

  const convertCurrency = useCallback((amountInBase: number): number => {
    if (!rates || rates.baseCurrency === selectedCurrency.code) {
      return amountInBase;
    }
    const rate = rates.rates[selectedCurrency.code];
    if (rate === undefined) {
      return amountInBase; // Fallback
    }
    return amountInBase * rate;
  }, [rates, selectedCurrency]);

  const formatCurrency = useCallback((amount: number, useCrL: boolean = false): string => {
    return formatCurrencyAmount(amount, selectedCurrency, { useCrL });
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        supportedCurrencies,
        rates,
        loading,
        error,
        setSelectedCurrency,
        convertCurrency,
        formatCurrency,
        refreshRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
