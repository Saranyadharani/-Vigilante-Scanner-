from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/scan/', include('scanner.urls')),
    path('test-db/', test_db),  # Add this line
]