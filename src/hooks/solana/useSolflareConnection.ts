import { useCallback } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';
import { PublicKey } from '@solana/web3.js';

export function useSolflareConnection() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connect = useCallback(async () => {
    try {
      // @ts-ignore
      const { solflare } = window;

      if (!solflare?.isSolflare) {
        window.open('https://solflare.com/', '_blank');
        return;
      }

      const response = await solflare.connect();
      const publicKey = new PublicKey(response.publicKey.toString());
      connectWallet('solflare', publicKey.toString());
      closeModal();
    } catch (error) {
      console.error('Error connecting to Solflare:', error);
    }
  }, [connectWallet, closeModal]);

  const disconnect = useCallback(async () => {
    try {
      // @ts-ignore
      const { solflare } = window;
      if (solflare) {
        await solflare.disconnect();
        disconnectWallet();
      }
    } catch (error) {
      console.error('Error disconnecting from Solflare:', error);
    }
  }, [disconnectWallet]);

  return {
    connect,
    disconnect,
    // @ts-ignore
    isSolflareInstalled: window?.solflare?.isSolflare || false
  };
}