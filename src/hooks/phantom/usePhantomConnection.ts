import { useCallback } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';
import { Connection, PublicKey } from '@solana/web3.js';

export function usePhantomConnection() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connect = useCallback(async () => {
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

  const disconnect = useCallback(async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        disconnectWallet();
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom:', error);
    }
  }, [disconnectWallet]);

  return {
    connect,
    disconnect,
    // @ts-ignore
    isPhantomInstalled: window?.solana?.isPhantom || false
  };
}