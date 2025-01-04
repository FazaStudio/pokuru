import { useCallback } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';
import { TonConnectUI } from '@tonconnect/ui-react';
import { TON_CONFIG } from '../config/ton';

export function useWalletIntegration() {
  const { connect, disconnect } = useWallet();

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
        connect('metamask', accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  }, [connect]);

  const connectPhantom = useCallback(async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      
      if (!solana?.isPhantom) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await solana.connect();
      const publicKey = new PublicKey(response.publicKey.toString());
      connect('phantom', publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
    }
  }, [connect]);

  const connectTon = useCallback(() => {
    try {
      const tonConnectUI = new TonConnectUI({
        manifestUrl: TON_CONFIG.manifest.url,
        buttonRootId: 'ton-button',
      });
      
      tonConnectUI.connectWallet();
      connect('tonwallet', '');
    } catch (error) {
      console.error('Error connecting to TON wallet:', error);
    }
  }, [connect]);

  return {
    connectMetaMask,
    connectPhantom,
    connectTon,
    disconnect,
  };
}