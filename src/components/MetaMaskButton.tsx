import { useMetaMask } from '../hooks/useMetaMask';

export const MetaMaskButton = () => {
  const { connect, disconnect, connected } = useMetaMask();

  return (
    <button
      onClick={connected ? disconnect : connect}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md bg-orange-600 text-white hover:bg-orange-700"
    >
      <img src="/metamask.png" alt="MetaMask" className="w-6 h-6" />
      {connected ? 'Disconnect MetaMask' : 'Connect MetaMask'}
    </button>
  );
};