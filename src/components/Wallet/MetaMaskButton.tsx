import { useMetaMaskSDK } from '../../hooks/ethereum/useMetaMaskSDK';
import { formatWalletAddress } from '../../utils/formatters';

interface MetaMaskButtonProps {
  isConnected: boolean;
  address?: string | null;
}

export const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isConnected,
  address
}) => {
  const { connect, disconnect, connecting, isMetaMaskInstalled } = useMetaMaskSDK();

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
      disabled={connecting}
      className={`flex items-center gap-3 w-full p-3 rounded-lg bg-[#13141F] hover:bg-[#1C1D2A] transition-colors border border-gray-800 hover:border-gray-700 ${
        connecting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <img src="/icons/wallets/metamask.svg" alt="MetaMask" className="w-8 h-8" />
      <div className="flex flex-col items-start">
        <span className="text-white text-sm font-medium">
          {!isMetaMaskInstalled ? 'Install MetaMask' :
           connecting ? 'Connecting...' : 
           isConnected ? 'Disconnect' : 'Connect MetaMask'}
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