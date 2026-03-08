import os
import django
import sys

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from scanner.models import CommunityStory

print("=== DEBUGGING COMMUNITY STORIES ===")

# Count all stories
stories = CommunityStory.objects.all()
print(f"Total stories in database: {stories.count()}")

# Show each story with all details
for i, story in enumerate(stories, 1):
    print(f"\n--- Story {i} ---")
    print(f"ID: {story.id}")
    print(f"Title: {story.title}")
    print(f"Status: '{story.status}'")
    print(f"Is Public: {story.is_public}")
    print(f"Scam Type: '{story.scam_type}'")
    print(f"Created: {story.created_at}")

# Test the API filter
print(f"\n=== API FILTER TEST ===")
approved_stories = CommunityStory.objects.filter(status='Approved', is_public=True)
print(f"Stories with status='Approved' AND is_public=True: {approved_stories.count()}")

for story in approved_stories:
    print(f"✅ Would appear in API: '{story.title}'")

# Check all unique status values
print(f"\n=== STATUS ANALYSIS ===")
unique_statuses = CommunityStory.objects.values_list('status', flat=True).distinct()
print(f"All status values in database: {list(unique_statuses)}")