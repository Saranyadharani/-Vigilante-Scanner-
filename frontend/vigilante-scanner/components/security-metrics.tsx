"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SecurityMetrics } from "@/types"

interface SecurityMetricsProps {
  metrics: SecurityMetrics
}

export function SecurityMetricsDisplay({ metrics }: SecurityMetricsProps) {
  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "text-red-500"
    if (risk >= 50) return "text-yellow-500"
    return "text-green-500"
  }

  const getRiskCategory = (risk: number) => {
    if (risk >= 80) return "Critical Risk"
    if (risk >= 50) return "High Risk"
    if (risk >= 20) return "Medium Risk"
    return "Low Risk"
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-500"
    if (grade.startsWith("B")) return "text-yellow-500"
    return "text-red-500"
  }

  const getDomainAgeInfo = (age: number) => {
    if (age >= 3) return { color: "text-green-500", status: "🟢 More trustworthy" }
    return { color: "text-yellow-500", status: "🟡 Use caution" }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="glass-strong bg-card/50 border-border/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm text-muted-foreground">Risk Level</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-4xl font-bold ${getRiskColor(metrics.riskLevel)}`}>{metrics.riskLevel}</div>
            <p className="text-sm text-muted-foreground mt-1">{getRiskCategory(metrics.riskLevel)}</p>
          </CardContent>
        </Card>

        <Card className="glass-strong bg-card/50 border-border/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm text-muted-foreground">SSL Grade</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-4xl font-bold ${getGradeColor(metrics.sslGrade)}`}>{metrics.sslGrade}</div>
            <p className="text-sm text-muted-foreground mt-1">SSL Grade</p>
          </CardContent>
        </Card>

        <Card className="glass-strong bg-card/50 border-border/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm text-muted-foreground">Domain Age</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-4xl font-bold ${getDomainAgeInfo(metrics.domainAge).color}`}>{metrics.domainAge}</div>
            <p className="text-sm text-muted-foreground mt-1">{getDomainAgeInfo(metrics.domainAge).status}</p>
          </CardContent>
        </Card>
      </div>

      {/* ADD SECURITY REPORT CARD BELOW - NO OTHER CHANGES */}
      <Card className="glass-strong bg-card/30 border-border/30 mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <span className="text-blue-500">ℹ️</span>
            Security Report Card
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">SSL Grade Guide</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-medium">🟢 A or A+ Grade:</span>
                <span className="text-muted-foreground">
                  Excellent. This site uses top-tier security. You can browse and shop with confidence.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 font-medium">🟡 B or C Grade:</span>
                <span className="text-muted-foreground">
                  Warning. The security is outdated or weak. Be cautious about entering sensitive information.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-medium">🔴 F Grade:</span>
                <span className="text-muted-foreground">
                  Danger. This site's security is broken or missing. Do not enter any personal details.
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 pt-4">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
              Domain Age Guide
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 font-medium">🟡 New Domain (Less than 1 year):</span>
                <span className="text-muted-foreground">Use caution.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-medium">🟢 Older Domain (3+ years):</span>
                <span className="text-muted-foreground">More trustworthy.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}