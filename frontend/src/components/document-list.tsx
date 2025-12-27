"use client"

import { FileText, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Document {
  id: string
  name: string
  date: string
}

interface DocumentListProps {
  documents: Document[]
  onUpdate: (documentId: string, documentName: string) => void
  onDelete: (documentId: string, documentName: string) => void
}

export function DocumentList({ documents, onUpdate, onDelete }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No documents yet</h3>
        <p className="text-sm text-muted-foreground">Upload your first document to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="group flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate mb-1">{doc.name}</h4>
              <p className="text-xs text-muted-foreground">Added on {new Date(doc.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdate(doc.id, doc.name)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(doc.id, doc.name)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
