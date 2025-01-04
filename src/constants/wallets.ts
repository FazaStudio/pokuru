interface Wallet {
  id: string;
  name: string;
  icon: string;
}

interface WalletGroup {
  name: string;
  wallets: Wallet[];
}

export const walletGroups: WalletGroup[] = [
  {
    name: 'TON',
    wallets: [
      { id: 'tonwallet', name: 'TON Wallet', icon: '/icons/wallets/ton.svg' },
    ],
  },
  {
    name: 'Ethereum',
    wallets: [
      { id: 'metamask', name: 'MetaMask', icon: '/icons/wallets/metamask.svg' },
      { id: 'walletconnect', name: 'WalletConnect', icon: '/icons/wallets/walletconnect.svg' },
    ],
  },
];