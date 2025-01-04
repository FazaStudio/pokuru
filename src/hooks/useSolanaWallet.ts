import { useCallback } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useWalletModal } from '../hooks/useWalletModal';
import { PublicKey } from '@solana/web3.js';

export function useSolanaWallet() {
  const { connect: connectWallet, disconnect } = useWallet();
  const { closeModal } = useWalletModal();

  const connectPhantom = useCallback(async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      
      if (!solana?.isPhantom) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await solana.connect();
      const publicKey = new PublicKey(response.publicKey.toString());
      connectWallet('phantom', publicKey.toString());
      closeModal();
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
    }
  }, [connectWallet, closeModal]);

  return {
    connectPhantom,
    disconnect
  };
}