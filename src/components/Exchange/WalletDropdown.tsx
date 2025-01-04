import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../../hooks/useWalletModal';
import { formatWalletAddress } from '../../utils/formatters';

export const WalletDropdown: React.FC = () => {
  const { isConnected, walletAddress } = useWallet();
  const { openModal } = useWalletModal();

  return (
    <button
      onClick={openModal}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 text-sm font-medium"
    >
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span>{formatWalletAddress(walletAddress || '')}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
};