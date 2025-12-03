"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityMetricsDisplay } from "@/components/security-metrics"
import type { SecurityMetrics } from "@/types"

export default function DashboardPage() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Starting security scan for URL:", url)

    setIsScanning(true)
    setMetrics(null)
    setError(null)

    try {
      const API_URL = 'http://127.0.0.1:8000/api/scan/';
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      });
      if (!response.ok) {
        throw new Error(`Scan failed with status: ${response.status}`)
      }

      const realData = await response.json()
      console.log("Backend response:", realData)
      
      const metricsData: SecurityMetrics = {
        riskLevel: realData.riskLevel || 0,
        sslGrade: realData.sslGrade || "N/A",
        domainAge: realData.domainAge || 0,
        riskCategory: realData.riskCategory || "Unknown",
        domain: realData.domain || ""
      }
      
      setMetrics(metricsData)
      
    } catch (error) {
      console.error('Scan failed:', error)
      setError(error instanceof Error ? error.message : 'Scan failed. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Website Security Scanner</h1>
            <p className="text-lg text-muted-foreground">Enter a URL to perform comprehensive security analysis</p>
          </div>

          <Card className="glass-strong bg-card/50 border-border/50 mb-8">
            <CardHeader>
              <CardTitle>Security Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="glass-subtle bg-background/50"
                  />
                </div>
                <Button type="submit" className="w-full glow-button" disabled={isScanning}>
                  {isScanning ? "Scanning..." : "Start Security Scan"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-destructive/15 border border-destructive/30 text-destructive p-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">Scan Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isScanning && (
            <div className="text-center mb-8">
              <div className="glass-strong bg-card/50 p-8 rounded-lg">
                <div className="animate-spin w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Scanning in Progress</h3>
                <p className="text-muted-foreground text-sm">Analyzing security configuration and vulnerabilities...</p>
              </div>
            </div>
          )}

          {metrics && !isScanning && (
            <div className="animate-slide-in-up">
              <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Security Analysis Results</h2>
              <SecurityMetricsDisplay metrics={metrics} />
              
              {/* ADDED CYBERCELL INFO BOX - ONLY THIS PART IS NEW */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🚨 Been Scammed? Need Help?</h3>
                <p className="text-sm text-yellow-700 mb-2">
                  Contact National Cyber Crime Helpline:
                </p>
                <div className="text-lg font-bold text-yellow-900">
                  📞 1930
                </div>
                <p className="text-xs text-yellow-600 mt-2">
                  Available 24/7 | Free Call | Multilingual Support
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}