"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    } else {
      setBalance(null);
    }
  }, [publicKey, connection]);

  return (
    <main className="relative">
      <Navbar />
      <WalletMultiButton />
      <HeroSection />
      <FeatureCards />
    </main>
  )
}
