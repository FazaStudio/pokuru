import { useCallback, useEffect } from 'react';
import { TonConnect } from '@tonconnect/sdk';
import { TON_CONNECT_OPTIONS } from '../config/tonConnect';
import { useWallet } from '../contexts/WalletContext';

export function useTonConnect() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  
  const connector = new TonConnect(TON_CONNECT_OPTIONS);

  useEffect(() => {
    // Listen for wallet changes
    const unsubscribe = connector.onStatusChange(wallet => {
      if (wallet) {
        connectWallet('tonwallet', wallet.account.address);
      } else {
        disconnectWallet();
      }
    });

    // Check if already connected
    const checkConnection = async () => {
      const wallet = await connector.getWallet();
      if (wallet) {
        connectWallet('tonwallet', wallet.account.address);
      }
    };
    
    checkConnection();

    return () => {
      unsubscribe();
    };
  }, [connector, connectWallet, disconnectWallet]);

  const connect = useCallback(async () => {
    try {
      // Generate connection URL
      const universalLink = connector.connect({
        universalUrl: true,
        bridgeUrl: true
      });

      if (universalLink) {
        // Open wallet
        window.open(universalLink, '_blank');
      }
    } catch (error) {
      console.error('Error connecting to TON wallet:', error);
      disconnectWallet();
    }
  }, [connector, disconnectWallet]);

  const disconnect = useCallback(async () => {
    try {
      await connector.disconnect();
      disconnectWallet();
    } catch (error) {
      console.error('Error disconnecting TON wallet:', error);
    }
  }, [connector, disconnectWallet]);

  return {
    connect,
    disconnect,
    connector
  };
}