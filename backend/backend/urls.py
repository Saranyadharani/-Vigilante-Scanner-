from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
import os
import sys

def test_db(request):
    """Test database connection"""
    result = {
        "database_url_exists": False,
        "database_configured": False,
        "error": None,
        "python_version": sys.version,
    }
    
    try:
        from django.db import connection
        result["database_url_exists"] = bool(os.environ.get('DATABASE_URL'))
        
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            row = cursor.fetchone()
            result["database_configured"] = True
            result["query_result"] = row[0]
    except Exception as e:
        result["error"] = str(e)
        result["error_type"] = type(e).__name__
    
    return JsonResponse(result)

def create_superuser(request):
    """Create superuser endpoint"""
    User = get_user_model()
    
    username = 'saran'
    password = 'Saranya@0602'
    email = 'saran@example.com'
    
    try:
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            return HttpResponse("✅ Superuser 'saran' created successfully! You can now login at /admin")
        else:
            return HttpResponse("✅ Superuser 'saran' already exists! You can login at /admin")
    except Exception as e:
        return HttpResponse(f"❌ Error creating superuser: {e}")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/scan/', include('scanner.urls')),
    path('test-db/', test_db),
    path('create-superuser/', create_superuser),  # Add this line
]