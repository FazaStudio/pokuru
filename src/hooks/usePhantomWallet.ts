import { useState, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';

export function usePhantomWallet() {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  const connect = useCallback(async () => {
    try {
      // @ts-ignore
      const { solana } = window;

      if (!solana?.isPhantom) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await solana.connect();
      setPublicKey(response.publicKey);
    } catch (error) {
      // Abaikan error jika user membatalkan koneksi
      if (error instanceof Error && !error.message.includes('User rejected')) {
        console.error('Gagal terhubung ke Phantom:', error);
      }
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        setPublicKey(null);
      }
    } catch (error) {
      console.error('Gagal memutuskan koneksi Phantom:', error);
    }
  }, []);

  return {
    publicKey,
    connected: !!publicKey,
    connect,
    disconnect,
    // @ts-ignore
    isPhantomInstalled: window?.solana?.isPhantom || false
  };
}