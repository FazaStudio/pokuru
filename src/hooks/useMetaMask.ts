import { useState } from 'react';
import { ethers } from 'ethers';

export const useMetaMask = () => {
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    try {
      // @ts-ignore
      if (!window.ethereum) {
        alert('MetaMask tidak ditemukan! Silakan install terlebih dahulu.');
        return;
      }

      // @ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setConnected(true);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const disconnect = () => {
    setConnected(false);
  };

  return { connect, disconnect, connected };
};