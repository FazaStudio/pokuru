import { PublicKey } from '@solana/web3.js';

export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export function shortenSolanaAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}