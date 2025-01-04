import { MetaMaskProvider as SDKProvider } from '@metamask/sdk-react';
import { ReactNode } from 'react';

interface MetaMaskProviderProps {
  children: ReactNode;
}

export const MetaMaskProvider = ({ children }: MetaMaskProviderProps) => {
  return (
    <SDKProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Pokuru",
          url: window.location.href,
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
      {children}
    </SDKProvider>
  );
};