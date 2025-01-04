import { useTonConnect } from '../utils/wallet';

export const TonConnectButton = () => {
  const { connect, disconnect, connected } = useTonConnect();

  return (
    <button
      onClick={connected ? disconnect : connect}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
    >
      <img src="/ton.png" alt="TON" className="w-6 h-6" />
      {connected ? 'Disconnect TON' : 'Connect TON'}
    </button>
  );
};