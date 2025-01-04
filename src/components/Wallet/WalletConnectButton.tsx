import { useWalletConnect } from '../../hooks/evm/useWalletConnect';
import { formatWalletAddress } from '../../utils/formatters';

interface WalletConnectButtonProps {
  isConnected: boolean;
  address?: string | null;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  isConnected,
  address
}) => {
  const { connect, disconnect } = useWalletConnect();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-3 w-full p-3 rounded-lg bg-[#13141F] hover:bg-[#1C1D2A] transition-colors border border-gray-800 hover:border-gray-700"
    >
      <img src="/icons/wallets/walletconnect.svg" alt="WalletConnect" className="w-8 h-8" />
      <div className="flex flex-col items-start">
        <span className="text-white text-sm font-medium">
          {isConnected ? 'Disconnect' : 'WalletConnect'}
        </span>
        {isConnected && address && (
          <span className="text-gray-400 text-xs">
            {formatWalletAddress(address)}
          </span>
        )}
      </div>
    </button>
  );
};