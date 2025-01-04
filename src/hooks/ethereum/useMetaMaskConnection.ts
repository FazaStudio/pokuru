import { useCallback } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';
import { ethers } from 'ethers';

export function useMetaMaskConnection() {
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connect = useCallback(async () => {
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

        // Listen untuk perubahan akun
        // @ts-ignore
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
          if (newAccounts.length > 0) {
            connectWallet('metamask', newAccounts[0]);
          } else {
            disconnectWallet();
          }
        });

        // Listen untuk perubahan network
        // @ts-ignore
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      }
    } catch (error) {
      if (error instanceof Error && !error.message.includes('User rejected')) {
        console.error('Error saat koneksi ke MetaMask:', error);
      }
    }
  }, [connectWallet, disconnectWallet, closeModal]);

  const disconnect = useCallback(() => {
    // Hapus event listener
    // @ts-ignore
    if (window.ethereum) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
    
    disconnectWallet();
    closeModal();
  }, [disconnectWallet, closeModal]);

  return {
    connect,
    disconnect,
    // @ts-ignore
    isMetaMaskInstalled: typeof window !== 'undefined' && !!window.ethereum?.isMetaMask
  };
}