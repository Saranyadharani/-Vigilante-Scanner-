"use client"

import { useEffect, useState } from "react"

interface RiskGaugeProps {
  score: number // 0-100
  label: string
  className?: string
}

export function RiskGauge({ score, label, className = "" }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-destructive"
    if (score >= 50) return "text-yellow-500"
    return "text-green-500"
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "High Risk"
    if (score >= 50) return "Medium Risk"
    return "Low Risk"
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" fill="none" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-2000 ease-out ${getRiskColor(animatedScore)}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${getRiskColor(animatedScore)}`}>{Math.round(animatedScore)}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className={`text-xs ${getRiskColor(animatedScore)}`}>{getRiskLevel(animatedScore)}</p>
      </div>
    </div>
  )
}
