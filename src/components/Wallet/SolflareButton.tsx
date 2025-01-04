import { useSolflareConnection } from '../../hooks/solana/useSolflareConnection';
import { formatWalletAddress } from '../../utils/formatters';

interface SolflareButtonProps {
  isConnected: boolean;
  address?: string | null;
}

export const SolflareButton: React.FC<SolflareButtonProps> = ({
  isConnected,
  address
}) => {
  const { connect, disconnect, isSolflareInstalled } = useSolflareConnection();

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
      <img src="/icons/wallets/solflare.svg" alt="Solflare" className="w-8 h-8" />
      <div className="flex flex-col items-start">
        <span className="text-white text-sm font-medium">
          {isConnected ? 'Disconnect' : isSolflareInstalled ? 'Connect Solflare' : 'Install Solflare'}
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