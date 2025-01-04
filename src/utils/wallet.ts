import { useState } from 'react';

export const useTonConnect = () => {
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    // Implementasi koneksi TON wallet
    setConnected(true);
  };

  const disconnect = () => {
    setConnected(false);
  };

  return { connect, disconnect, connected };
};