import { useCallback, useState } from 'react';
import { PhantomProvider } from '@phantom/wallet-sdk';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';

export function usePhantomSDK() {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const getProvider = useCallback(async () => {
    if (provider) return provider;

    try {
      const newProvider = await PhantomProvider.connect({
        appUrl: window.location.origin,
        cluster: 'mainnet-beta'
      });
      setProvider(newProvider);
      return newProvider;
    } catch (error) {
      console.error('Error getting Phantom provider:', error);
      return null;
    }
  }, [provider]);

  const connect = useCallback(async () => {
    try {
      const phantomProvider = await getProvider();
      if (!phantomProvider) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const connection = await phantomProvider.connect();
      if (connection.publicKey) {
        connectWallet('phantom', connection.publicKey.toString());
        closeModal();
      }
    } catch (error) {
      if (error instanceof Error && !error.message.includes('User rejected')) {
        console.error('Error connecting to Phantom:', error);
      }
    }
  }, [getProvider, connectWallet, closeModal]);

  const disconnect = useCallback(async () => {
    try {
      const phantomProvider = await getProvider();
      if (phantomProvider) {
        await phantomProvider.disconnect();
        disconnectWallet();
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom:', error);
    }
  }, [getProvider, disconnectWallet]);

  return {
    connect,
    disconnect,
    isPhantomInstalled: !!provider
  };
}