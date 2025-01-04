import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { ExchangeForm } from './components/Exchange/ExchangeForm';
import { Header } from './components/Layout/Header';
import { WalletModal } from './components/Wallet/WalletModal';
import { WalletProvider } from './contexts/WalletContext';
import { useWalletModal } from './hooks/useWalletModal';
import { TON_CONFIG } from './config/ton';

const App: React.FC = () => {
  const { isOpen, closeModal } = useWalletModal();

  return (
    <MetaMaskProvider
      debug={true} // Enable debug untuk development
      sdkOptions={{
        checkInstallationImmediately: false, // Jangan cek instalasi secara otomatis
        dappMetadata: {
          name: "Pokuru",
          url: window.location.href,
        },
        // Tambahkan opsi ini untuk memastikan popup muncul
        modals: {
          install: true, // Tampilkan modal instalasi jika MetaMask tidak terinstall
          otp: true, // Tampilkan modal OTP jika diperlukan
        }
      }}
    >
      <TonConnectUIProvider manifestUrl={TON_CONFIG.manifestUrl}>
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
            <Header />
            <main className="pt-24 px-4 pb-6 sm:pb-12">
              <div className="max-w-xl mx-auto">
                <ExchangeForm />
              </div>
            </main>
            <WalletModal isOpen={isOpen} onClose={closeModal} />
          </div>
        </WalletProvider>
      </TonConnectUIProvider>
    </MetaMaskProvider>
  );
};

export default App;