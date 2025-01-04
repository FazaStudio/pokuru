import { PublicKey, Transaction } from '@solana/web3.js';

interface PhantomEvent {
  type: string;
  data: any;
}

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  isPhantom?: boolean;
  publicKey: PublicKey | null;
  isConnected: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: string, handler: (args: PhantomEvent) => void) => void;
  request: (method: string, params: any) => Promise<any>;
  removeListener: (event: string, handler: (args: PhantomEvent) => void) => void;
}

interface Window {
  phantom?: {
    solana?: PhantomProvider;
  }
  solana?: PhantomProvider;
}