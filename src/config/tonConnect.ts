import { TonConnectOptions } from '@tonconnect/sdk';

export const TON_CONNECT_OPTIONS: TonConnectOptions = {
  manifestUrl: '/tonconnect-manifest.json',
  walletsListSource: 'https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json',
  walletsList: []
};