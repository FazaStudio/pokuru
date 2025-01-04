import { useCallback } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useWalletModal } from './useWalletModal';
import { ethers } from 'ethers';

export function useEthereumWallet() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connectMetaMask = useCallback(async () => {
    try {
      // @ts-ignore
      if (!window.ethereum) {
        window.open('https://metamask.io/', '_blank');
        return;
      }

      // @ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts[0]) {
        connectWallet('metamask', accounts[0]);
        closeModal();
      }
    } catch (error) {
      // Only log unexpected errors
      if (error instanceof Error && !error.message.includes('User rejected')) {
        console.error('Error connecting to MetaMask:', error);
      }
    }
  }, [connectWallet, closeModal]);

  return {
    connectMetaMask,
    disconnect: disconnectWallet
  };
}