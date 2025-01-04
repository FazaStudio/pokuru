export const WALLET_CONFIG = {
  ton: {
    manifest: {
      url: window.location.origin + '/tonconnect-manifest.json',
      name: 'Pokuru',
      iconUrl: window.location.origin + '/icons/logo.svg'
    },
    walletList: 'https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json'
  }
};