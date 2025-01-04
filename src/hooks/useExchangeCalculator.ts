import { useState, useCallback } from 'react';
import { calculatePrice } from '../utils/prices';
import type { CryptoCurrency } from '../constants/currencies';

export function useExchangeCalculator(initialCrypto: CryptoCurrency) {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isFromCrypto, setIsFromCrypto] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState(initialCrypto);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = useCallback((value: string, from: string, to: string) => {
    if (!value || isNaN(parseFloat(value))) {
      return '';
    }
    const amount = parseFloat(value);
    const result = calculatePrice(from, to, amount);
    return result.toString();
  }, []);

  const refreshRates = useCallback(() => {
    if (!fromAmount) return;
    
    setLoading(true);
    const from = isFromCrypto ? selectedCrypto : 'IDR';
    const to = isFromCrypto ? 'IDR' : selectedCrypto;
    const newToAmount = calculateEstimate(fromAmount, from, to);
    setToAmount(newToAmount);
    setLoading(false);
  }, [fromAmount, isFromCrypto, selectedCrypto, calculateEstimate]);

  const handleFromAmountChange = useCallback((value: string) => {
    setFromAmount(value);
    if (value) {
      const from = isFromCrypto ? selectedCrypto : 'IDR';
      const to = isFromCrypto ? 'IDR' : selectedCrypto;
      setToAmount(calculateEstimate(value, from, to));
    } else {
      setToAmount('');
    }
  }, [isFromCrypto, selectedCrypto, calculateEstimate]);

  const handleToAmountChange = useCallback((value: string) => {
    setToAmount(value);
    if (value) {
      const from = isFromCrypto ? 'IDR' : selectedCrypto;
      const to = isFromCrypto ? selectedCrypto : 'IDR';
      setFromAmount(calculateEstimate(value, from, to));
    } else {
      setFromAmount('');
    }
  }, [isFromCrypto, selectedCrypto, calculateEstimate]);

  const handleCryptoChange = useCallback((crypto: CryptoCurrency) => {
    setSelectedCrypto(crypto);
    if (fromAmount) {
      const from = isFromCrypto ? crypto : 'IDR';
      const to = isFromCrypto ? 'IDR' : crypto;
      setToAmount(calculateEstimate(fromAmount, from, to));
    }
  }, [fromAmount, isFromCrypto, calculateEstimate]);

  const handleSwap = useCallback(() => {
    setIsFromCrypto((prev) => !prev);
    const tempFrom = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempFrom);
  }, [fromAmount, toAmount]);

  return {
    fromAmount,
    toAmount,
    isFromCrypto,
    selectedCrypto,
    loading,
    handleFromAmountChange,
    handleToAmountChange,
    handleSwap,
    handleCryptoChange,
    refreshRates,
    setSelectedCrypto, // Export this to allow external updates
  };
}