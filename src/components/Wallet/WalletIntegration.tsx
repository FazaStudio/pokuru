import { useEthereumWallet } from '../../hooks/useEthereumWallet';
import { useSolanaWallet } from '../../hooks/useSolanaWallet';
import { useTonWallet } from '../../hooks/useTonWallet';
import { WalletButton } from './WalletButton';

export const WalletIntegration = () => {
  const { connectMetaMask } = useEthereumWallet();
  const { connectPhantom } = useSolanaWallet();
  const { connectTon } = useTonWallet();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm text-gray-400">Ethereum wallets</h3>
        <WalletButton
          name="MetaMask"
          icon="/icons/wallets/metamask.svg"
          onClick={connectMetaMask}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm text-gray-400">Solana wallet</h3>
        <WalletButton
          name="Phantom"
          icon="/icons/wallets/phantom.svg"
          onClick={connectPhantom}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm text-gray-400">TON wallet</h3>
        <WalletButton
          name="TON Wallet"
          icon="/icons/wallets/ton.svg"
          onClick={connectTon}
        />
      </div>
    </div>
  );
}