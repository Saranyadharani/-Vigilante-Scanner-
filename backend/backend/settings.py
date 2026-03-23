# ALLOWED_HOSTS - Updated for Render and Vercel
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.vercel.app',
    'vigilante-scanner.onrender.com',
    '.onrender.com',
    'vigilante-scanner.vercel.app',
]

# ... (keep everything else the same) ...

# CORS settings - Updated for Vercel frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "https://vigilante-scanner.vercel.app",
    "https://villigante-scanner.vercel.app",
    "https://*.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "https://vigilante-scanner.vercel.app",
    "https://villigante-scanner.vercel.app",
    "https://*.vercel.app",
]

# Allow credentials for CORS
CORS_ALLOW_CREDENTIALS = True

# Allow all headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Allow all methods
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Preflight max age
CORS_PREFLIGHT_MAX_AGE = 86400