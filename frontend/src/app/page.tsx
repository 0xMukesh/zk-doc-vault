'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { WalletButton } from '@/components/WalletButton';

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      // Fetch wallet balance
      connection.getBalance(publicKey).then((bal) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
    } else {
      setBalance(null);
    }
  }, [publicKey, connection]);

  return (
    <main className="min-h-screen p-8">
      <WalletButton />
      
      <div className="max-w-4xl mx-auto mt-16">
        <h1 className="text-4xl font-bold mb-8">Solana Wallet Integration</h1>
        
        {publicKey ? (
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="mb-2">
              <strong>Connected Wallet:</strong>
            </p>
            <p className="font-mono text-sm break-all mb-4">
              {publicKey.toString()}
            </p>
            
            {balance !== null && (
              <p>
                <strong>Balance:</strong> {balance.toFixed(4)} SOL
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">
            Connect your wallet to get started
          </p>
        )}
      </div>
    </main>
  );
}