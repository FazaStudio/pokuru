import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { METAMASK_CONFIG } from './config/metamask';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: METAMASK_CONFIG.appName,
          url: METAMASK_CONFIG.appUrl,
        },
        // Tambahkan opsi ini untuk meningkatkan keandalan koneksi
        connectOptions: {
          timeout: 30000, // 30 detik
          shouldShimWeb3: true,
        },
        // Pastikan SDK menunggu sampai halaman dimuat sepenuhnya
        readyState: {
          waitUntilReady: true,
        }
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);