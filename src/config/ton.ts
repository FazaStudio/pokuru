export const TON_CONFIG = {
  manifestUrl: "https://robnoob.xyz/manifest.json",
  walletsListSource:
    "https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json",
  retryCount: 3,
  // Tambahkan konfigurasi timeout
  connectionTimeout: 30000, // 30 detik
  // Tambahkan opsi untuk menangani error
  errorHandling: {
    // Error yang bisa diabaikan
    ignoredErrors: [
      "Operation aborted",
      "Connection timeout",
      "TON_CONNECT_SDK_ERROR",
    ],
  },
} as const;
