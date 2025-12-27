"use client"

import { Button } from "@/components/ui/button"

import { Shield, Lock, Eye, Zap, Database, FileCheck } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Proofs",
    description:
      "Verify document authenticity without revealing sensitive content. Mathematical cryptography ensures privacy.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade encryption protects your documents at rest and in transit. Only you hold the keys.",
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Eye,
    title: "Private by Design",
    description: "We never see your data. Zero-knowledge architecture means even we cannot access your documents.",
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-teal-400",
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description:
      "Prove document integrity in milliseconds without exposing content. Lightning-fast cryptographic validation.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Database,
    title: "Decentralized Storage",
    description: "Distributed architecture ensures redundancy and availability. Your documents are always accessible.",
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: FileCheck,
    title: "Tamper-Proof Audit",
    description: "Immutable audit trails track every document interaction. Complete transparency with zero trust.",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
]

export function FeatureCards() {
  return (
    <section className="min-h-screen py-24 px-6 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Cryptographic Security
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Made Simple</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade document security powered by cutting-edge zero-knowledge cryptography
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              {/* Icon with gradient background */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Hover effect line */}
              <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Ready to secure your documents?</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            Start Using ZKVault
          </Button>
        </div>
      </div>
    </section>
  )
}
