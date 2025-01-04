import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import type { CryptoCurrency } from '../../constants/currencies';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: string;
  onCurrencyChange?: (currency: CryptoCurrency) => void;
  readOnly?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
  currency,
  onCurrencyChange,
  readOnly = false
}) => {
  const { supportedCoins } = useWallet();
  const showCryptoOptions = currency !== 'IDR';

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex gap-3 items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-lg sm:text-xl text-white placeholder-gray-500 outline-none"
          placeholder="0.00"
          readOnly={readOnly}
        />
        {showCryptoOptions ? (
          <select
            value={currency}
            onChange={(e) => onCurrencyChange?.(e.target.value as CryptoCurrency)}
            disabled={!onCurrencyChange}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-gray-600 transition-colors text-sm font-medium border border-gray-600"
          >
            {supportedCoins.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        ) : (
          <div className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm font-medium border border-gray-600">
            IDR
          </div>
        )}
      </div>
    </div>
  );
};