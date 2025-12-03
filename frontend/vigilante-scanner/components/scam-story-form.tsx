"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ScamStoryFormData } from "@/types"

export function ScamStoryForm() {
  const [formData, setFormData] = useState<ScamStoryFormData>({
    title: "",
    story: "",
    websiteOrPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch('http://127.0.0.1:8000/api/scan/submit-story/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          story: formData.story,
          website: formData.websiteOrPhone,
          scam_type: 'Other Scam Type',
          author_name: 'Anonymous User'
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message)
        setFormData({ title: "", story: "", websiteOrPhone: "" })
      } else {
        setMessage('Error: ' + result.error)
      }
    } catch (error) {
      setMessage('Failed to submit story. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-strong bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle>Share Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title of the Scam *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Brief title describing the scam"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="glass-subtle bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Your Story *</Label>
            <Textarea
              id="story"
              placeholder="Tell us what happened. Your story could help protect others..."
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              required
              rows={6}
              className="glass-subtle bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Website/Phone Number involved</Label>
            <Input
              id="contact"
              type="text"
              placeholder="Website URL or phone number (optional)"
              value={formData.websiteOrPhone}
              onChange={(e) => setFormData({ ...formData, websiteOrPhone: e.target.value })}
              className="glass-subtle bg-background/50"
            />
          </div>

          {message && (
            <div className={`p-3 rounded text-sm ${
              message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full glow-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Story"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}