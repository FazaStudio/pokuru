import { usePhantomConnection } from '../../hooks/solana/usePhantomConnection';
import { formatWalletAddress } from '../../utils/formatters';

interface PhantomWalletButtonProps {
  isConnected: boolean;
  address?: string | null;
}

export const PhantomWalletButton: React.FC<PhantomWalletButtonProps> = ({
  isConnected,
  address
}) => {
  const { connect, disconnect, isPhantomInstalled } = usePhantomConnection();

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
      <img src="/icons/wallets/phantom.svg" alt="Phantom" className="w-8 h-8" />
      <div className="flex flex-col items-start">
        <span className="text-white text-sm font-medium">
          {!isPhantomInstalled ? 'Install Phantom' : 
           isConnected ? 'Disconnect Phantom' : 'Connect Phantom'}
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