import { useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useWallet } from '../../contexts/WalletContext';
import { useWalletModal } from '../useWalletModal';

export function useTonConnection() {
  const [tonConnectUI] = useTonConnectUI();
  const { connect: connectWallet, disconnect: disconnectWallet } = useWallet();
  const { closeModal } = useWalletModal();

  const connect = useCallback(async () => {
    try {
      // Tambahkan timeout untuk mencegah operasi menggantung
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout')), 30000);
      });

      // Race antara koneksi wallet dan timeout
      const connected = await Promise.race([
        tonConnectUI.connectWallet(),
        timeoutPromise
      ]);

      if (connected && tonConnectUI.wallet) {
        connectWallet('tonwallet', tonConnectUI.wallet.account.address);
        closeModal();
      }
    } catch (error) {
      // Abaikan error yang umum terjadi saat user membatalkan atau timeout
      if (error instanceof Error && 
          !error.message.includes('Operation aborted') &&
          !error.message.includes('Connection timeout') &&
          !error.message.includes('TON_CONNECT_SDK_ERROR')) {
        console.error('Error connecting to TON wallet:', error);
      }
      disconnectWallet();
    }
  }, [tonConnectUI, connectWallet, closeModal, disconnectWallet]);

  const disconnect = useCallback(async () => {
    try {
      await tonConnectUI.disconnect();
      disconnectWallet();
      closeModal();
    } catch (error) {
      // Abaikan error yang umum terjadi saat disconnect
      if (error instanceof Error && 
          !error.message.includes('Operation aborted') &&
          !error.message.includes('TON_CONNECT_SDK_ERROR')) {
        console.error('Error disconnecting TON wallet:', error);
      }
      // Tetap lakukan disconnect dari aplikasi
      disconnectWallet();
    }
  }, [tonConnectUI, disconnectWallet, closeModal]);

  return {
    connect,
    disconnect,
    isConnected: !!tonConnectUI.wallet,
    wallet: tonConnectUI.wallet
  };
}