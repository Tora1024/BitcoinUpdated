import { createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { fetchBitcoinPrice } from '../utils/fetchPrice';

type PriceContextValue = {
  bitcoinPrice: string;
  updateBitcoinPrice: () => Promise<void>;
};

export const PriceContext = createContext<PriceContextValue | null>(null);

export function PriceProvider({ children }: { children: h.JSX.Element }) {
  const [bitcoinPrice, setBitcoinPrice] = useState('');

  const updateBitcoinPrice = async () => {
    const price = await fetchBitcoinPrice();
    setBitcoinPrice(price);
  };

  useEffect(() => {
    updateBitcoinPrice();
  }, []);

  return <PriceContext.Provider value={{ bitcoinPrice, updateBitcoinPrice }}>{children}</PriceContext.Provider>;
}

export function useBitcoinPrice() {
  return useContext(PriceContext);
}
