import React from 'react';

export const ExchangeHeader: React.FC = () => {
  return (
    <div className="text-center mb-6 sm:mb-8 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Crypto Exchange IDR</h1>
      <p className="text-sm sm:text-base text-gray-300">
        Tukar TON, Solana, dan Base dengan Rupiah menggunakan QRIS
      </p>
    </div>
  );
};