from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
from .models import ScanResult, CommunityStory
from .utils.url_parser import extract_domain_from_url
from .utils.ssl_checker import check_ssl
from .utils.domain_checker import get_domain_age
from .utils.risk_calculator import calculate_risk

@csrf_exempt
@require_POST
def scan_url(request):
    try:
        data = json.loads(request.body)
        url = data.get('url', '').strip()
        
        if not url:
            return JsonResponse({'error': 'URL is required'}, status=400)
        
        domain = extract_domain_from_url(url)
        
        # Perform security checks
        ssl_data = check_ssl(domain)
        domain_data = get_domain_age(domain)
        risk_level = calculate_risk(ssl_data, domain_data)
        
        # Determine risk category based on risk level
        if risk_level >= 80:
            risk_category = 'critical'
        elif risk_level >= 60:
            risk_category = 'high'
        elif risk_level >= 30:
            risk_category = 'medium'
        else:
            risk_category = 'low'
        
        # ✅ SAVE TO DATABASE - Create ScanResult object
        scan_result = ScanResult.objects.create(
            url=url,
            domain=domain,
            risk_level=risk_level,
            risk_category=risk_category,
            ssl_grade=ssl_data.get('grade', 'N/A'),
            domain_age=domain_data.get('age', 0),
            ssl_valid=ssl_data.get('valid', False),
            security_score=100 - risk_level,
            trust_score=max(0, 100 - risk_level)
        )
        
        # Prepare response data
        response_data = {
            'riskLevel': risk_level,
            'riskCategory': risk_category,
            'sslGrade': ssl_data.get('grade', 'N/A'),
            'domainAge': domain_data.get('age', 0),
            'domain': domain,
            'scanId': scan_result.id,
            'message': 'Scan completed and saved to database'
        }
        
        return JsonResponse(response_data)
        
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'Internal server error: ' + str(e)}, status=500)

@csrf_exempt
def get_community_stories(request):
    """API to get approved community stories for frontend"""
    try:
        # FIX: Use lowercase 'approved' to match your database
        stories = CommunityStory.objects.filter(status='approved', is_public=True).order_by('-created_at')[:10]
        
        print(f"✅ API: Found {stories.count()} stories with status 'approved'")
        
        stories_data = []
        for story in stories:
            stories_data.append({
                'id': story.id,
                'title': story.title,
                'story': story.story,
                'website_url': story.website_url or 'Not provided',
                'phone_number': story.phone_number or 'Not provided',
                'scam_type': story.scam_type,
                'author_name': story.author_name,
                'created_at': story.created_at.strftime('%B %d, %Y')
            })
        
        return JsonResponse({'stories': stories_data})
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_POST
def submit_community_story(request):
    """API to submit new community stories from frontend"""
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        title = data.get('title', '').strip()
        story_text = data.get('story', '').strip()
        
        if not title or not story_text:
            return JsonResponse({'error': 'Title and story are required'}, status=400)
        
        # Create new story with CORRECT field names
        story = CommunityStory.objects.create(
            title=title,
            story=story_text,
            website_url=data.get('website', '').strip(),  # CORRECT: website_url not website
            phone_number=data.get('phone_number', '').strip(),
            scam_type=data.get('scam_type', 'Other Scam Type'),
            author_name=data.get('author_name', 'Anonymous'),
            is_anonymous=data.get('is_anonymous', False),
            status='Pending Review',
            is_public=True
        )
        
        return JsonResponse({
            'status': 'success', 
            'message': 'Story submitted for review! It will appear after admin approval.',
            'story_id': story.id
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def get_scam_statistics(request):
    """API to get scam statistics for dashboard"""
    try:
        total_stories = CommunityStory.objects.count()
        approved_stories = CommunityStory.objects.filter(status='approved').count()  # FIX: lowercase
        pending_stories = CommunityStory.objects.filter(status='Pending Review').count()
        
        # Count by scam type
        scam_types = {}
        for story in CommunityStory.objects.filter(status='approved'):  # FIX: lowercase
            scam_type = story.scam_type
            scam_types[scam_type] = scam_types.get(scam_type, 0) + 1
        
        return JsonResponse({
            'total_stories': total_stories,
            'approved_stories': approved_stories,
            'pending_stories': pending_stories,
            'scam_type_breakdown': scam_types
        })
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)