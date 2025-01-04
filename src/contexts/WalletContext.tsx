import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import type { WalletId } from '../constants/walletCoins';
import { WALLET_SUPPORTED_COINS } from '../constants/walletCoins';

interface WalletContextType {
  isConnected: boolean;
  connect: (walletId: WalletId, address: string) => void;
  disconnect: () => void;
  activeWallet: WalletId | null;
  walletAddress: string | null;
  supportedCoins: readonly string[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [activeWallet, setActiveWallet] = useState<WalletId | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (tonConnectUI.wallet) {
      setIsConnected(true);
      setActiveWallet('tonwallet');
      setWalletAddress(tonConnectUI.wallet.account.address);
    } else {
      setIsConnected(false);
      setActiveWallet(null);
      setWalletAddress(null);
    }
  }, [tonConnectUI.wallet]);

  const connect = (walletId: WalletId, address: string) => {
    setIsConnected(true);
    setActiveWallet(walletId);
    setWalletAddress(address);
  };

  const disconnect = () => {
    setIsConnected(false);
    setActiveWallet(null);
    setWalletAddress(null);
  };

  const supportedCoins = activeWallet 
    ? WALLET_SUPPORTED_COINS[activeWallet] 
    : ['TON'];

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      connect, 
      disconnect, 
      activeWallet,
      walletAddress,
      supportedCoins 
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}