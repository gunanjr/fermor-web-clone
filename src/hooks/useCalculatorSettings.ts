import { useState, useLayoutEffect } from 'react';

export function useCalculatorSettings<T>(calculatorId: string, defaultSettings: T) {
  const [settings, setSettings] = useState<T>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // useLayoutEffect (not useEffect) runs synchronously before the browser paints,
  // so the default values are never actually rendered to the screen when a saved
  // value exists in localStorage. useEffect runs after paint, which is what caused
  // every calculator to visibly flash from its defaults to the saved values on load.
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(`fermor-${calculatorId}-v1`);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, [calculatorId]);

  const updateSettings = (newSettings: Partial<T>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(`fermor-${calculatorId}-v1`, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  return { settings, updateSettings, isLoaded };
}
