import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient } = configureChains(
  [mainnet, base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Pokuru',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});