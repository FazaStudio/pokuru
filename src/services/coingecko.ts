import axios from 'axios';
import { CryptoCurrency, FiatCurrency } from '../constants/currencies';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const COIN_IDS: Record<CryptoCurrency, string> = {
  TON: 'the-open-network',
  SOL: 'solana',
  ETH: 'ethereum'
};

export async function getExchangeRate(
  from: CryptoCurrency | FiatCurrency,
  to: CryptoCurrency | FiatCurrency
): Promise<number> {
  try {
    if (from === 'IDR' || to === 'IDR') {
      const cryptoCurrency = from === 'IDR' ? to : from;
      const coinId = COIN_IDS[cryptoCurrency as CryptoCurrency];
      
      if (!coinId) {
        throw new Error(`Unsupported cryptocurrency: ${cryptoCurrency}`);
      }

      const response = await axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: 'idr'
        }
      });

      const rate = response.data[coinId].idr;
      
      // If converting from IDR to crypto, we need to invert the rate
      return from === 'IDR' ? 1 / rate : rate;
    }
    
    throw new Error('At least one currency must be IDR');
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}