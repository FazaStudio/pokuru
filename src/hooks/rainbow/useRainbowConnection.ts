import { useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';

export function useRainbowConnection() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const connect = useCallback(async () => {
    try {
      const rainbowConnector = connectors.find(c => c.id === 'rainbow');
      if (!rainbowConnector) {
        window.open('https://rainbow.me', '_blank');
        return;
      }

      await connectAsync({ connector: rainbowConnector });
      if (address) {
        connectWallet('rainbow', address);
        closeModal();
      }
    } catch (error) {
      console.error('Error connecting Rainbow wallet:', error);
    }
  }, [connectAsync, connectors, address, connectWallet, closeModal]);

  const disconnect = useCallback(async () => {
    try {
      await disconnectAsync();
      disconnectWallet();
    } catch (error) {
      console.error('Error disconnecting Rainbow wallet:', error);
    }
  }, [disconnectAsync, disconnectWallet]);

  return {
    connect,
    disconnect,
    isConnected
  };
}