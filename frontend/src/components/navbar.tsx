"use client"

import { Shield, Upload, List, Info } from "lucide-react"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Navbar() {
  const handleHomeClick = () => {
    alert("Home button clicked")
  }

  const handleUploadClick = () => {
    alert("Upload button clicked")
  }

  const handleViewListClick = () => {
    alert("View List button clicked")
  }

  const handleAboutUsClick = () => {
    alert("About Us button clicked")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-mono text-xl font-bold text-foreground">ZKVault</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={handleHomeClick}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={handleUploadClick}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
            <button
              onClick={handleViewListClick}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <List className="w-4 h-4" />
              View List
            </button>
            <button
              onClick={handleAboutUsClick}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Info className="w-4 h-4" />
              About Us
            </button>
          </div>

          {/* Wallet Connect Button */}
          <div className="wallet-button-container">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </nav>
  )
}