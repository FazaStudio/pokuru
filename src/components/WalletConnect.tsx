import { TonConnectButton } from './TonConnectButton';
import { PhantomButton } from './PhantomButton';
import { MetaMaskButton } from './MetaMaskButton';

export const WalletConnect = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-4">Pilih Wallet</h2>
      <div className="flex flex-col gap-2">
        <TonConnectButton />
        <PhantomButton />
        <MetaMaskButton />
      </div>
    </div>
  );
};