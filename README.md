# 🔍 Vigilante Scanner - Advanced Website Security Scanner

**Advanced Website Security Scanner & Community Scam Awareness Hub**

[![Real-time Scanning](https://img.shields.io/badge/feature-Real--time%20Scanning-blue)]()
[![SSL Analysis](https://img.shields.io/badge/feature-SSL%20Analysis-green)]()
[![Risk Assessment](https://img.shields.io/badge/feature-Risk%20Assessment-orange)]()
[![Community Platform](https://img.shields.io/badge/feature-Community%20Platform-purple)]()

Vigilante Scanner is a comprehensive full-stack web application for real-time website security analysis, SSL certificate grading, domain risk assessment, and community scam awareness. It combines advanced security scanning technology with a platform for users to share scam experiences and protect others.

> **Community Highlight:** This project includes a community-driven platform where users can share their scam experiences and help others avoid similar threats, creating a safer online environment for everyone.

![Dashboard View](Images/Screenshot%20v1.png)
![Community Page](Images/Screenshot%20v2.png)

*The interface shows the security analysis dashboard, SSL certificate grading, risk assessment, and community scam awareness sections.*

## 🚀 Features

- **🔒 SSL Certificate Analysis**: Comprehensive TLS/SSL grading system (A+, A, B, C, F) with detailed certificate validation.
- **📅 Domain Age Detection**: WHOIS-based domain registration history analysis to identify newly created suspicious domains.
- **⚠️ Risk Assessment**: Intelligent 1-100 risk scoring system that evaluates multiple security factors.
- **⚡ Real-time Scanning**: Instant security analysis of any website with detailed results in seconds.
- **💾 Database Storage**: Permanent storage of scan history for trend analysis and historical reference.
- **👥 Scam Awareness Platform**: Community-driven platform where users share scam stories to protect others.

## 🛠️ Tech Stack

**Backend:**
- Django 4.2+ - Python web framework
- Django REST Framework - API construction
- PostgreSQL/SQLite - Database management
- SSL/TLS Analysis - Certificate validation
- WHOIS Integration - Domain registration lookup

**Frontend:**
- Next.js 15+ - React framework with App Router
- TypeScript - Type-safe development
- Tailwind CSS - Modern styling framework
- React Hooks - State management

## 📦 Installation & Setup

**Prerequisites:**

# Required dependencies

Frontend Setup (Public Access):

bash
# Navigate to frontend directory
cd frontend/vigilante-scanner

# Install dependencies
npm install

# Start development server
npm run dev
Frontend will run at: http://localhost:3000

Backend Setup:

bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
Backend will run at: http://localhost:8000

🎯 Usage
Start the frontend server (port 3000) and open your browser to http://localhost:3000

Enter a website URL in the scanner input field to view comprehensive security analysis including:

Risk Level (1-100 scale)

SSL Certificate Grade

Domain Age information

Security recommendations

Test URLs to Try:

text
https://google.com - Low risk, A grade
https://github.com - Established domain
https://httpstat.us/200 - Various test cases
🔧 API Endpoints
POST /api/scan/
Scan a website for security analysis

Request:

json
{
  "url": "https://example.com"
}
Response:

json
{
  "riskLevel": 35,
  "riskCategory": "medium",
  "sslGrade": "A",
  "domainAge": 5,
  "domain": "example.com",
  "scanId": 42,
  "message": "Scan completed successfully"
}
🔒 Backend Security Notice
The backend administration and database management systems are private and secured. Public access is limited to the API endpoints required for the scanning functionality only.

Access Restrictions:

Django admin panel: Private access only

Database management: Admin access only

API endpoints: Limited to scanning functionality

Authentication: Protected admin routes

Server configuration: Secured deployment

The public-facing application provides a secure and controlled interface while maintaining the privacy and security of the backend infrastructure.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.


Python 3.8 or higher
Node.js 16 or higher
PostgreSQL (optional - SQLite works for development)
