"use client"

import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse [animation-delay:1s]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-8 animate-in fade-in zoom-in duration-700">
          <Shield className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 [animation-delay:200ms]">
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            ZKVault
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 [animation-delay:400ms]">
          Secure document storage powered by <span className="text-primary font-semibold">zero-knowledge proofs</span>.
          Your privacy, mathematically guaranteed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 [animation-delay:600ms]">
          <Button size="lg" className="text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 h-12 border-border hover:bg-accent/50 bg-transparent"
          >
            Learn More
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
