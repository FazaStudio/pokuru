import { exec } from 'child_process';

// Jalankan test dalam lingkungan browser
exec('npx ts-node src/tests/testPhantomConnection.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});