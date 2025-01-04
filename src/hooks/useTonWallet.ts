import { useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useWallet } from '../contexts/WalletContext';

export function useTonWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();

  const connectTon = useCallback(async () => {
    try {
      await tonConnectUI.connectWallet();
      const wallet = tonConnectUI.wallet;
      
      if (wallet) {
        connectWallet('tonwallet', wallet.account.address);
      }
    } catch (error) {
      console.error('Error connecting to TON wallet:', error);
      disconnectWallet();
    }
  }, [tonConnectUI, connectWallet, disconnectWallet]);

  const disconnect = useCallback(async () => {
    try {
      await tonConnectUI.disconnect();
      disconnectWallet();
    } catch (error) {
      console.error('Error disconnecting TON wallet:', error);
    }
  }, [tonConnectUI, disconnectWallet]);

  return {
    connectTon,
    disconnect,
    isConnected: !!tonConnectUI.wallet
  };
}