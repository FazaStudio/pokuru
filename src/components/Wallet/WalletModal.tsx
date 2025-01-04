import React from 'react';
import { WalletSection } from './WalletSection';
import { TonWalletButton } from './TonWalletButton';
import { MetaMaskButton } from './MetaMaskButton';
import { useWallet } from '../../contexts/WalletContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { isConnected, activeWallet, walletAddress } = useWallet();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-dark-700/50 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 flex justify-between items-center border-b border-dark-700/50">
          <h2 className="text-white font-medium">Connect Wallet</h2>
          <button onClick={onClose} className="text-dark-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          <WalletSection title="TON">
            <TonWalletButton 
              isConnected={isConnected && activeWallet === 'tonwallet'} 
              address={activeWallet === 'tonwallet' ? walletAddress : null} 
            />
          </WalletSection>

          <WalletSection title="Ethereum">
            <MetaMaskButton
              isConnected={isConnected && activeWallet === 'metamask'}
              address={activeWallet === 'metamask' ? walletAddress : null}
            />
          </WalletSection>
        </div>

        <div className="p-4 text-sm text-dark-400 border-t border-dark-700/50">
          <p>
            By connecting a wallet, you agree to{' '}
            <a href="#" className="text-accent-400 hover:text-accent-300 transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};