"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Search, Shield } from "lucide-react"

interface ScannerCardProps {
  onScan: (url: string) => void
  isScanning: boolean
}

export function ScannerCard({ onScan, isScanning }: ScannerCardProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onScan(url.trim())
    }
  }

  return (
    <Card className="glass-strong bg-card/50 p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Website Security Scanner</h2>
        <p className="text-muted-foreground">Enter a URL to perform comprehensive security analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="glass bg-input/50 border-border/50 text-lg py-6 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            disabled={isScanning}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        <Button
          type="submit"
          disabled={!url.trim() || isScanning}
          className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none animate-pulse-glow"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5 mr-2" />
              Start Security Scan
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
