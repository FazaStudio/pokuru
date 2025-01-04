import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Ganti dengan API key Alchemy Anda
const API_KEY = "your-api-key";
const NETWORK = "eth-mainnet";

export const web3 = createAlchemyWeb3(
  `https://${NETWORK}.g.alchemy.com/v2/${API_KEY}`
);