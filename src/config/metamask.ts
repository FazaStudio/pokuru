// Konfigurasi untuk MetaMask dan Web3
export const METAMASK_CONFIG = {
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '',
  chains: [1], // Ethereum mainnet
  appName: 'Pokuru',
  appUrl: window.location.href,
} as const;