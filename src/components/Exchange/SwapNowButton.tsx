import React from 'react';
import { useWallet } from '../../contexts/WalletContext';

interface SwapNowButtonProps {
  fromAmount: string;
  disabled?: boolean;
  onClick: () => void;
}

export const SwapNowButton: React.FC<SwapNowButtonProps> = ({
  fromAmount,
  disabled = false,
  onClick
}) => {
  const { isConnected } = useWallet();
  const isValid = fromAmount && parseFloat(fromAmount) > 0;

  return (
    <button
      onClick={onClick}
      disabled={disabled || !isValid}
      className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-white font-medium text-sm sm:text-base transition-all
        ${isValid && !disabled
          ? 'bg-blue-600 hover:bg-blue-500 shadow-lg hover:shadow-blue-500/25'
          : 'bg-gray-600 cursor-not-allowed'
        }`}
    >
      {isConnected ? 'Swap Now' : 'Connect Wallet'}
    </button>
  );
};