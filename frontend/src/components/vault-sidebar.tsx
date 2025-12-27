"use client"

import { FolderLock } from "lucide-react"

interface VaultSidebarProps {
  vaults: string[]
  selectedVault: string
  onVaultSelect: (vaultName: string) => void
}

export function VaultSidebar({ vaults, selectedVault, onVaultSelect }: VaultSidebarProps) {
  return (
    <div className="w-72 min-h-screen bg-card border-r border-border pt-8">
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">My Vaults</h2>
        <p className="text-sm text-muted-foreground">Select a vault to view documents</p>
      </div>

      <div className="space-y-1 px-3">
        {vaults.map((vault) => (
          <button
            key={vault}
            onClick={() => onVaultSelect(vault)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              selectedVault === vault
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <FolderLock className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{vault}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
