"use client"

import { Shield, Upload, List, Info } from "lucide-react"
// import { useConnection, useWallet } from "@solana/wallet-adapter-react"
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { useEffect, useState } from "react"
// import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export function Navbar() {
  // ===============================================
  // CALLBACK FUNCTION: HOME BUTTON
  // ----ADD HOME BUTTON CODE HERE----
  // ===============================================
  const handleHomeClick = () => {
    alert("Home button clicked")
    // Add your home navigation logic here
  }

  // ===============================================
  // CALLBACK FUNCTION: UPLOAD BUTTON
  // ----ADD UPLOAD CODE HERE----
  // ===============================================
  const handleUploadClick = () => {
    alert("Upload button clicked")
    // Add your document upload logic here
  }

  // ===============================================
  // CALLBACK FUNCTION: VIEW LIST BUTTON
  // ----ADD VIEW LIST CODE HERE----
  // ===============================================
  const handleViewListClick = () => {
    alert("View List button clicked")
    // Add your view document list logic here
  }

  // ===============================================
  // CALLBACK FUNCTION: ABOUT US BUTTON
  // ----ADD ABOUT US CODE HERE----
  // ===============================================
  const handleAboutUsClick = () => {
    alert("About Us button clicked")
    // Add your about us page navigation logic here
  }

  // ===============================================
  // CONNECT BUTTON
  // ----ADD CONNECT CODE HERE----
  // ===============================================
  

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

          {/* Connect Button */}
        </div>
      </div>
    </nav>
  )
}
