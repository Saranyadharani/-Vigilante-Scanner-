from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import ScanResult, CommunityStory
from .utils.url_parser import extract_domain_from_url
from .utils.ssl_checker import check_ssl
from .utils.domain_checker import get_domain_age
from .utils.risk_calculator import calculate_risk

@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
def scan_url(request):
    """Handle URL scanning for both GET and POST requests"""
    
    # Handle CORS preflight
    if request.method == "OPTIONS":
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    try:
        # Get URL from either GET or POST
        if request.method == 'GET':
            url = request.GET.get('url', '').strip()
        else:  # POST
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
        
        # Save to database - Create ScanResult object
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
            'message': 'Scan completed and saved to database',
            'is_fake': risk_level > 50,  # Add fake detection flag
            'security_score': 100 - risk_level,
            'ssl_valid': ssl_data.get('valid', False),
            'domain_age_years': round(domain_data.get('age', 0) / 365, 1)
        }
        
        response = JsonResponse(response_data)
        response["Access-Control-Allow-Origin"] = "*"
        return response
        
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'Internal server error: ' + str(e)}, status=500)