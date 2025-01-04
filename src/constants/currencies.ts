export const CRYPTO_CURRENCIES = ['TON', 'SOL', 'ETH'] as const;
export const FIAT_CURRENCIES = ['IDR'] as const;

export type CryptoCurrency = typeof CRYPTO_CURRENCIES[number];
export type FiatCurrency = typeof FIAT_CURRENCIES[number];
export type Currency = CryptoCurrency | FiatCurrency;