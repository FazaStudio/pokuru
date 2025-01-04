import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { formatWalletAddress } from '../../utils/formatters';

export const SolanaWalletButton = () => {
  const { publicKey, connected } = useWallet();
  
  return (
    <div className="w-full">
      <WalletMultiButton 
        className="w-full justify-center bg-[#13141F] hover:bg-[#1C1D2A] rounded-lg border border-gray-800 hover:border-gray-700"
      >
        {connected && publicKey ? formatWalletAddress(publicKey.toString()) : 'Connect Phantom'}
      </WalletMultiButton>
    </div>
  );
};