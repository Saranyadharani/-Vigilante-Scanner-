"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RiskGauge } from "./risk-gauge"
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface SecurityResult {
  category: string
  score: number
  status: "pass" | "warning" | "fail"
  details: string[]
}

interface ResultsDisplayProps {
  url: string
  overallScore: number
  results: SecurityResult[]
}

export function ResultsDisplay({ url, overallScore, results }: ResultsDisplayProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (category: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCards(newExpanded)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "fail":
        return <XCircle className="w-5 h-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: "bg-green-500/20 text-green-400 border-green-500/30",
      warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      fail: "bg-destructive/20 text-destructive border-destructive/30",
    }

    return <Badge className={`${variants[status as keyof typeof variants]} border`}>{status.toUpperCase()}</Badge>
  }

  return (
    <div className="space-y-8 animate-slide-in-up">
      {/* Header */}
      <Card className="glass-strong bg-card/50 p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Security Analysis Complete</h3>
          <p className="text-muted-foreground mb-4">
            Scanned: <span className="text-primary font-mono">{url}</span>
          </p>
          <RiskGauge score={overallScore} label="Overall Security Score" />
        </div>
      </Card>

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {results.map((result, index) => (
          <Card
            key={result.category}
            className="glass bg-card/30 p-6 transition-all duration-300 hover:bg-card/50 cursor-pointer"
            onClick={() => toggleCard(result.category)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(result.status)}
                <h4 className="text-lg font-semibold text-foreground">{result.category}</h4>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(result.status)}
                {expandedCards.has(result.category) ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <RiskGauge score={result.score} label={`${result.category} Score`} className="scale-75 -my-2" />
            </div>

            {expandedCards.has(result.category) && (
              <div className="space-y-2 animate-slide-in-up">
                <h5 className="font-medium text-foreground">Details:</h5>
                <ul className="space-y-1">
                  {result.details.map((detail, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
