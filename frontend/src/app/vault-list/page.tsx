"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { VaultSidebar } from "@/components/vault-sidebar"
import { DocumentList } from "@/components/document-list"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

// Example data structure - replace with your actual data
const mockVaults = ["Personal Documents", "Work Files", "Tax Records", "Medical Records"]
const mockDocuments: { [key: string]: Array<{ id: string; name: string; date: string }> } = {
  "Personal Documents": [
    { id: "1", name: "Passport.pdf", date: "2024-01-15" },
    { id: "2", name: "Birth Certificate.pdf", date: "2024-01-10" },
    { id: "3", name: "Insurance Policy.pdf", date: "2024-01-05" },
  ],
  "Work Files": [
    { id: "4", name: "Contract.pdf", date: "2024-02-01" },
    { id: "5", name: "Project Proposal.docx", date: "2024-01-28" },
  ],
  "Tax Records": [{ id: "6", name: "Tax Return 2023.pdf", date: "2024-03-15" }],
  "Medical Records": [
    { id: "7", name: "Lab Results.pdf", date: "2024-02-20" },
    { id: "8", name: "Prescription.pdf", date: "2024-02-15" },
  ],
}

export default function VaultListPage() {
  const [selectedVault, setSelectedVault] = useState<string>(mockVaults[0])

  // ===============================================
  // CALLBACK FUNCTION: UPLOAD BUTTON (TOP RIGHT)
  // ----ADD UPLOAD CODE HERE----
  // ===============================================
  const handleUploadClick = () => {
    console.log("Upload button clicked from vault list page")
    // Add your document upload logic here for the current vault
  }

  // ===============================================
  // CALLBACK FUNCTION: VAULT SELECTION
  // ----ADD VAULT SELECTION CODE HERE----
  // ===============================================
  const handleVaultSelect = (vaultName: string) => {
    console.log("Vault selected:", vaultName)
    setSelectedVault(vaultName)
    // Add your logic to fetch documents for the selected vault
  }

  // ===============================================
  // CALLBACK FUNCTION: DOCUMENT UPDATE
  // ----ADD DOCUMENT UPDATE CODE HERE----
  // ===============================================
  const handleDocumentUpdate = (documentId: string, documentName: string) => {
    console.log("Update document:", documentId, documentName)
    // Add your document update logic here
  }

  // ===============================================
  // CALLBACK FUNCTION: DOCUMENT DELETE
  // ----ADD DOCUMENT DELETE CODE HERE----
  // ===============================================
  const handleDocumentDelete = (documentId: string, documentName: string) => {
    console.log("Delete document:", documentId, documentName)
    // Add your document delete logic here
  }

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />

      <div className="flex pt-16">
        {/* Left Sidebar - Vault List */}
        <VaultSidebar vaults={mockVaults} selectedVault={selectedVault} onVaultSelect={handleVaultSelect} />

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header with Upload Button */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{selectedVault}</h1>
              <p className="text-muted-foreground">{mockDocuments[selectedVault]?.length || 0} documents</p>
            </div>
            <Button onClick={handleUploadClick} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {/* Document List */}
          <DocumentList
            documents={mockDocuments[selectedVault] || []}
            onUpdate={handleDocumentUpdate}
            onDelete={handleDocumentDelete}
          />
        </div>
      </div>
    </main>
  )
}
