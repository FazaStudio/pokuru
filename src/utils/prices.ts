import { EXCHANGE_RATES } from '../constants/exchangeRates';

export const calculatePrice = (from: string, to: string, amount: number): number => {
  if (from === 'IDR') {
    // Converting from IDR to crypto
    return amount / EXCHANGE_RATES[to as keyof typeof EXCHANGE_RATES];
  } else if (to === 'IDR') {
    // Converting from crypto to IDR
    return amount * EXCHANGE_RATES[from as keyof typeof EXCHANGE_RATES];
  } else {
    // Converting between cryptocurrencies (should not happen in current implementation)
    const fromToIDR = amount * EXCHANGE_RATES[from as keyof typeof EXCHANGE_RATES];
    return fromToIDR / EXCHANGE_RATES[to as keyof typeof EXCHANGE_RATES];
  }
}