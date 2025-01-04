import { Connection, clusterApiUrl } from '@solana/web3.js';

export const SOLANA_CONFIG = {
  network: 'mainnet-beta',
  connection: new Connection(clusterApiUrl('mainnet-beta')),
  // Add other Solana-specific configuration here
} as const;