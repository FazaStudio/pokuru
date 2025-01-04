import axios from 'axios';
import { SUPPORTED_COINS } from '../constants/coins';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getPriceRate = async (from: keyof typeof SUPPORTED_COINS, to: keyof typeof SUPPORTED_COINS): Promise<number> => {
  try {
    if (to === 'IDR') {
      const response = await axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: SUPPORTED_COINS[from].id,
          vs_currencies: 'idr'
        }
      });
      return response.data[SUPPORTED_COINS[from].id].idr;
    }
    
    if (from === 'IDR') {
      const response = await axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: SUPPORTED_COINS[to].id,
          vs_currencies: 'idr'
        }
      });
      return 1 / response.data[SUPPORTED_COINS[to].id].idr;
    }

    return 0;
  } catch (error) {
    console.error('Error fetching price:', error);
    return 0;
  }
};