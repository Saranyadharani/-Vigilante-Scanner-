"use client"

import { Navigation } from "@/components/navigation"
import { ScamStoryForm } from "@/components/scam-story-form"
import { ScamStoriesFeed } from "@/components/scam-stories-feed"

export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Community Scam Awareness Hub</h1>
            <p className="text-lg text-muted-foreground">Share your story. Protect others.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ScamStoryForm />
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Help Others Stay Safe</h2>
              <p className="text-muted-foreground">
                Your experience with scams can help protect others in our community. By sharing your story, you're
                contributing to a safer digital environment for everyone.
              </p>
              <div className="glass-strong bg-card/50 p-4 rounded-lg border border-border/50">
                <h3 className="font-semibold text-foreground mb-2">Why Share?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Warn others about new scam tactics</li>
                  <li>• Help identify patterns and trends</li>
                  <li>• Build community awareness</li>
                  <li>• Support fellow victims</li>
                </ul>
              </div>
            </div>
          </div>

          <ScamStoriesFeed />
        </div>
      </div>
    </div>
  )
}
