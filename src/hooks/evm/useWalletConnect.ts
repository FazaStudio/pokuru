import { useCallback } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';
import EthereumProvider from '@walletconnect/ethereum-provider';

const projectId = 'YOUR_PROJECT_ID'; // Get from WalletConnect Cloud

export function useWalletConnect() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connect = useCallback(async () => {
    try {
      const provider = await EthereumProvider.init({
        projectId,
        chains: [1], // Ethereum mainnet
        showQrModal: true
      });

      await provider.enable();
      const accounts = await provider.request({ method: 'eth_accounts' });
      
      if (accounts[0]) {
        connectWallet('walletconnect', accounts[0]);
        closeModal();
      }

      // Handle disconnect event
      provider.on('disconnect', () => {
        disconnectWallet();
      });

    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
    }
  }, [connectWallet, disconnectWallet, closeModal]);

  return {
    connect,
    disconnect: disconnectWallet
  };
}