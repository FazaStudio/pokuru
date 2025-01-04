import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

async function testPhantomConnection() {
  try {
    // Buat koneksi ke Solana devnet
    const connection = new Connection(clusterApiUrl('devnet'));
    console.log('✅ Berhasil terhubung ke Solana devnet');

    // Cek ketersediaan Phantom Wallet
    // @ts-ignore
    const { solana } = window;
    
    if (!solana?.isPhantom) {
      console.log('❌ Phantom wallet tidak terdeteksi');
      console.log('💡 Silakan install Phantom wallet terlebih dahulu');
      return;
    }

    console.log('✅ Phantom wallet terdeteksi');

    // Coba koneksi ke wallet
    try {
      const response = await solana.connect();
      const publicKey = new PublicKey(response.publicKey.toString());
      
      console.log('✅ Berhasil terhubung ke Phantom wallet');
      console.log('📝 Public Key:', publicKey.toString());

      // Cek saldo
      const balance = await connection.getBalance(publicKey);
      console.log('💰 Saldo:', balance / 1e9, 'SOL');

    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('User rejected')) {
          console.log('❌ User menolak koneksi wallet');
        } else {
          console.error('❌ Error saat koneksi:', err.message);
        }
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Jalankan test
testPhantomConnection();