import { useState, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';

export function usePhantomWallet() {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  // @ts-ignore
  const isPhantomInstalled = typeof window !== 'undefined' && !!window.solana?.isPhantom;

  const connect = useCallback(async () => {
    try {
      if (!isPhantomInstalled) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      // @ts-ignore
      const { solana } = window;
      const response = await solana.connect();
      const newPublicKey = new PublicKey(response.publicKey.toString());
      setPublicKey(newPublicKey);
      connectWallet('phantom', newPublicKey.toString());
      closeModal();
    } catch (error) {
      if (error instanceof Error && !error.message.includes('User rejected')) {
        console.error('Failed to connect to Phantom:', error);
      }
    }
  }, [connectWallet, closeModal, isPhantomInstalled]);

  const disconnect = useCallback(async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        setPublicKey(null);
        disconnectWallet();
      }
    } catch (error) {
      console.error('Failed to disconnect Phantom:', error);
    }
  }, [disconnectWallet]);

  return {
    publicKey,
    connected: !!publicKey,
    connect,
    disconnect,
    isPhantomInstalled
  };
}