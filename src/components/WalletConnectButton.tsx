import { useWallet } from '@solana/wallet-adapter-react';
import { formatAddress } from '../utils/format';

export const WalletConnectButton: React.FC = () => {
  const { publicKey, connected, connect, disconnect } = useWallet();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  // @ts-ignore
  const isPhantomInstalled = window?.solana?.isPhantom;

  return (
    <button
      onClick={handleClick}
      className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
    >
      {!isPhantomInstalled ? (
        'Install Phantom'
      ) : connected ? (
        <>
          <span>Connected:</span>
          <span className="font-mono">{formatAddress(publicKey?.toString())}</span>
        </>
      ) : (
        'Connect Phantom'
      )}
    </button>
  );
};