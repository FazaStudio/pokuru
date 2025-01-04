import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';

export function useMetaMaskSDK() {
  const [connecting, setConnecting] = useState(false);
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connect = useCallback(async () => {
    try {
      setConnecting(true);

      // @ts-ignore
      if (!window.ethereum?.isMetaMask) {
        window.open('https://metamask.io/', '_blank');
        return;
      }

      // Request akun dengan opsi yang lebih spesifik
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: []
      });
      
      if (accounts?.[0]) {
        // Pastikan kita terhubung ke jaringan yang benar (Ethereum Mainnet)
        // @ts-ignore
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // Jika bukan di mainnet (chainId: '0x1'), minta user untuk pindah
        if (chainId !== '0x1') {
          try {
            // @ts-ignore
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1' }],
            });
          } catch (switchError: any) {
            // Jika user menolak pergantian network
            console.error('User menolak pergantian network:', switchError);
            setConnecting(false);
            return;
          }
        }

        connectWallet('metamask', accounts[0]);
        closeModal();

        // Setup listeners
        const handleAccountsChanged = (newAccounts: string[]) => {
          if (newAccounts.length > 0) {
            connectWallet('metamask', newAccounts[0]);
          } else {
            disconnectWallet();
          }
        };

        const handleChainChanged = () => {
          window.location.reload();
        };

        // @ts-ignore
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        // @ts-ignore
        window.ethereum.on('chainChanged', handleChainChanged);
      }
    } catch (error) {
      if (error instanceof Error && 
          !error.message.includes('User rejected') &&
          !error.message.includes('Already processing')) {
        console.error('Error saat koneksi ke MetaMask:', error);
      }
    } finally {
      setConnecting(false);
    }
  }, [connectWallet, closeModal, disconnectWallet]);

  const disconnect = useCallback(() => {
    try {
      // @ts-ignore
      window.ethereum?.removeAllListeners('accountsChanged');
      // @ts-ignore
      window.ethereum?.removeAllListeners('chainChanged');
      
      disconnectWallet();
      closeModal();
    } catch (error) {
      console.error('Error saat disconnect dari MetaMask:', error);
    }
  }, [disconnectWallet, closeModal]);

  return {
    connect,
    disconnect,
    connecting,
    // @ts-ignore
    isMetaMaskInstalled: typeof window !== 'undefined' && !!window.ethereum?.isMetaMask
  };
}