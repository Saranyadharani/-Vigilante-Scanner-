"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RealScamStory {
  id: number
  title: string
  story: string
  website_url: string
  phone_number?: string
  scam_type: string
  author_name: string
  created_at: string
}

export function ScamStoriesFeed() {
  const [stories, setStories] = useState<RealScamStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedStoryId, setExpandedStoryId] = useState<number | null>(null)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/scan/community-stories/')
      const data = await response.json()
      
      if (response.ok) {
        setStories(data.stories)
      } else {
        setError('Failed to load stories')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const handleReadMore = (storyId: number) => {
    // Toggle expand/collapse
    if (expandedStoryId === storyId) {
      setExpandedStoryId(null) // Collapse
    } else {
      setExpandedStoryId(storyId) // Expand
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateStory = (story: string, maxLength = 150) => {
    return story.length > maxLength ? story.substring(0, maxLength) + "..." : story
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">Recent Stories</h3>
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading stories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">Recent Stories</h3>
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-foreground">Recent Stories</h3>
        <Button variant="outline" onClick={fetchStories} className="glass-subtle">
          Refresh
        </Button>
      </div>
      
      {stories.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No stories yet. Be the first to share your experience!
        </div>
      ) : (
        <div className="grid gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="glass-strong bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">{formatDate(story.created_at)}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  By {story.author_name} • {story.scam_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </CardHeader>
              <CardContent>
                {/* Show full story if expanded, truncated if not */}
                <p className="text-muted-foreground mb-4">
                  {expandedStoryId === story.id ? story.story : truncateStory(story.story)}
                </p>
                
                {story.website_url && story.website_url !== 'Not provided' && (
                  <p className="text-sm text-red-400 mb-4">
                    <strong>⚠️ Scammer Website:</strong> {story.website_url}
                  </p>
                )}
                
                {story.phone_number && story.phone_number !== 'Not provided' && (
                  <p className="text-sm text-red-400 mb-4">
                    <strong>📞 Scammer Phone:</strong> {story.phone_number}
                  </p>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleReadMore(story.id)} 
                  className="glass-subtle"
                >
                  {expandedStoryId === story.id ? 'Read Less' : 'Read More'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}