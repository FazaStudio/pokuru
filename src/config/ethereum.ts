// Konfigurasi untuk Ethereum dan Infura
export const ETH_CONFIG = {
  infura: {
    projectId: import.meta.env.VITE_INFURA_PROJECT_ID,
    endpoint: `https://mainnet.infura.io/v3/46ee360d067546f0b6a6b2327da210b7`,
  },
  chainId: 1, // Ethereum mainnet
  blockExplorer: 'https://etherscan.io'
} as const;