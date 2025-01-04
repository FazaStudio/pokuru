// Mapping wallet ke coin yang didukung
export const WALLET_SUPPORTED_COINS = {
  // Ethereum wallets
  metamask: ['ETH'],
  
  // TON wallets
  tonwallet: ['TON'],
} as const;

export type WalletId = keyof typeof WALLET_SUPPORTED_COINS;