"use client"

import { FloatingParticles } from "../components/floating-particles"
import { SecurityShield } from "../components/security-shield"
import { AuthForms } from "../components/auth-forms"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <SecurityShield className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-foreground mb-4 animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to Vigilante Scanner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Secure your digital assets with comprehensive security scanning
          </p>
        </div>

        <AuthForms />
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
    </div>
  )
}
