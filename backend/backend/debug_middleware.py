import os
import sys
import traceback

class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # This runs before the view
        print("="*50)
        print("Request path:", request.path)
        print("DATABASE_URL exists:", bool(os.environ.get('DATABASE_URL')))
        if os.environ.get('DATABASE_URL'):
            print("DATABASE_URL starts with:", os.environ.get('DATABASE_URL')[:30])
        print("="*50)
        
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        print("!"*50)
        print("EXCEPTION CAUGHT:", type(exception).__name__)
        print("Exception args:", exception.args)
        traceback.print_exc()
        print("!"*50)
        return None