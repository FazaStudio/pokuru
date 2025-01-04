import { PhantomProvider } from '@phantom/wallet-sdk';
import { Connection, clusterApiUrl } from '@solana/web3.js';

async function testPhantomSDK() {
  try {
    console.log('🔄 Menginisialisasi koneksi Phantom...');

    // Buat koneksi ke Solana devnet
    const connection = new Connection(clusterApiUrl('devnet'));
    console.log('✅ Berhasil terhubung ke Solana devnet');

    // Inisialisasi Phantom provider
    const provider = await PhantomProvider.connect({
      appUrl: 'http://localhost:3000',
      cluster: 'devnet'
    });

    if (!provider) {
      console.log('❌ Phantom provider tidak tersedia');
      console.log('💡 Silakan install Phantom wallet terlebih dahulu');
      return;
    }

    console.log('✅ Phantom provider tersedia');

    // Coba koneksi ke wallet
    try {
      const response = await provider.connect();
      console.log('✅ Berhasil terhubung ke Phantom wallet');
      console.log('📝 Public Key:', response.publicKey.toString());

      // Cek saldo
      const balance = await connection.getBalance(response.publicKey);
      console.log('💰 Saldo:', balance / 1e9, 'SOL');

      // Disconnect
      await provider.disconnect();
      console.log('✅ Berhasil disconnect dari wallet');

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
testPhantomSDK();