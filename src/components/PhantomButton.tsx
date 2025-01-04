import { usePhantomWallet } from '../hooks/usePhantomWallet';
import { formatWalletAddress } from '../utils/formatters';

export const PhantomButton = () => {
  const { publicKey, connected, connect, disconnect, isPhantomInstalled } = usePhantomWallet();

  const handleClick = () => {
    if (connected) {
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
           connected ? 'Disconnect' : 'Connect Phantom'}
        </span>
        {connected && publicKey && (
          <span className="text-gray-400 text-xs">
            {formatWalletAddress(publicKey.toString())}
          </span>
        )}
      </div>
    </button>
  );
};