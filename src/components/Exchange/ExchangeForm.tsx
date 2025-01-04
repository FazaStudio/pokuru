import { useState } from 'react';
import { CurrencyInput } from './CurrencyInput';
import { SwapButton } from './SwapButton';
import { SwapNowButton } from './SwapNowButton';
import { RefreshTimer } from './RefreshTimer';
import { PaymentMethodDropdown } from './PaymentMethodDropdown';
import { useExchangeCalculator } from '../../hooks/useExchangeCalculator';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../../hooks/useWalletModal';
import { formatIDR, formatCrypto } from '../../utils/formatters';
import type { PaymentMethod } from '../../constants/paymentMethods';

export const ExchangeForm = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('qris');
  const { openModal } = useWalletModal();
  const { activeWallet } = useWallet();
  
  const {
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
  } = useExchangeCalculator(activeWallet ? 'ETH' : 'TON');

  const handleSwapNow = () => {
    if (!activeWallet) {
      openModal();
    } else {
      alert('Fungsi swap akan diimplementasikan');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 max-w-md w-full mx-auto shadow-2xl border border-gray-700/50">
      <div className="space-y-4">
        <CurrencyInput
          label={isFromCrypto ? "Anda Kirim" : "Anda Terima"}
          value={fromAmount}
          onChange={handleFromAmountChange}
          currency={isFromCrypto ? selectedCrypto : 'IDR'}
          onCurrencyChange={isFromCrypto ? handleCryptoChange : undefined}
        />

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <SwapButton onClick={handleSwap} />
          </div>
          <div className="border-t border-gray-700 my-4"></div>
        </div>

        <CurrencyInput
          label={isFromCrypto ? "Anda Terima" : "Anda Kirim"}
          value={toAmount}
          onChange={handleToAmountChange}
          currency={isFromCrypto ? 'IDR' : selectedCrypto}
          onCurrencyChange={!isFromCrypto ? handleCryptoChange : undefined}
        />

        {loading && (
          <div className="text-gray-400 text-sm text-center animate-pulse">
            Mengambil kurs terbaru...
          </div>
        )}

        {fromAmount && toAmount && (
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="text-gray-300 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span>Kurs</span>
                <span className="text-white font-medium">
                  1 {isFromCrypto ? selectedCrypto : 'IDR'} = {' '}
                  {isFromCrypto 
                    ? formatIDR(parseFloat(toAmount) / parseFloat(fromAmount))
                    : formatCrypto(parseFloat(toAmount) / parseFloat(fromAmount))
                  } {isFromCrypto ? 'IDR' : selectedCrypto}
                </span>
              </div>
              <RefreshTimer onRefresh={refreshRates} />
            </div>
          </div>
        )}

        <PaymentMethodDropdown
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        />

        <SwapNowButton
          fromAmount={fromAmount}
          disabled={loading}
          onClick={handleSwapNow}
        />
      </div>
    </div>
  );
};