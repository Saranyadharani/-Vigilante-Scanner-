from django.urls import path
from . import views

urlpatterns = [
    path('', views.scan_url, name='scan_url'),
    path('community-stories/', views.get_community_stories, name='community_stories'),
    path('submit-story/', views.submit_community_story, name='submit_story'),
    path('scam-statistics/', views.get_scam_statistics, name='scam_statistics'),
]