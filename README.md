🔍 Vigilante Scanner - Advanced Website Security Scanner
<p align="center"> <img src="https://img.icons8.com/clouds/200/000000/security-checked.png" alt="Security Shield" width="150"> </p><p align="center"> <b>Advanced Website Security Scanner & Community Scam Awareness Hub</b> </p><p align="center"> <img src="https://img.shields.io/badge/Real-time%20Scanning-✓-success?style=flat&logo=clock&logoColor=white" alt="Real-time Scanning"> <img src="https://img.shields.io/badge/SSL%20Analysis-✓-success?style=flat&logo=lock&logoColor=white" alt="SSL Analysis"> <img src="https://img.shields.io/badge/Risk%20Assessment-✓-success?style=flat&logo=warning&logoColor=white" alt="Risk Assessment"> <img src="https://img.shields.io/badge/Community%20Platform-✓-success?style=flat&logo=people&logoColor=white" alt="Community Platform"> </p><p align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=22C55E&center=true&vCenter=true&width=435&lines=Protecting+the+digital+world;One+scan+at+a+time;Community-powered+security" alt="Typing SVG"> </p>
📋 Overview
Vigilante Scanner is a comprehensive full-stack web application for real-time website security analysis, SSL certificate grading, domain risk assessment, and community scam awareness. It combines advanced security scanning technology with a platform for users to share scam experiences and protect others.

🎯 Community Highlight: This project includes a community-driven platform where users can share their scam experiences and help others avoid similar threats, creating a safer online environment for everyone.

🖼️ Application Preview
<div align="center"> <img src="Screenshot%20v1.png" alt="Vigilante Scanner Dashboard" width="45%" style="border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); margin: 10px;"> <img src="Screenshot%20v2.png" alt="Vigilante Scanner Results" width="45%" style="border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); margin: 10px;"> <br> <em>Dashboard view showing the security scanning interface | Scan results showing security analysis and risk assessment</em> </div>
✨ Key Features
<table> <tr> <td width="50%" align="center"> <img src="https://img.icons8.com/dusk/64/000000/ssl.png" alt="SSL Icon" width="40"> <h3>SSL Certificate Analysis</h3> <p>Comprehensive TLS/SSL grading system (A+, A, B, C, F) with detailed certificate validation</p> </td> <td width="50%" align="center"> <img src="https://img.icons8.com/dusk/64/000000/calendar.png" alt="Calendar Icon" width="40"> <h3>Domain Age Detection</h3> <p>WHOIS-based domain registration history analysis to identify newly created suspicious domains</p> </td> </tr> <tr> <td width="50%" align="center"> <img src="https://img.icons8.com/dusk/64/000000/medium-risk.png" alt="Risk Icon" width="40"> <h3>Risk Assessment</h3> <p>Intelligent 1-100 risk scoring system that evaluates multiple security factors</p> </td> <td width="50%" align="center"> <img src="https://img.icons8.com/dusk/64/000000/lightning-bolt.png" alt="Lightning Icon" width="40"> <h3>Real-time Scanning</h3> <p>Instant security analysis of any website with detailed results in seconds</p> </td> </tr> <tr> <td width="50%" align="center"> <img src="https://img.icons8.com/dusk/64/000000/database.png" alt="Database Icon" width="40"> <h3>Database Storage</h3> <p>Permanent storage of scan history for trend analysis and historical reference</p> </td> <td width="50%" align="center"> <img src="https://img.icons8.com/dusk/64/000000/conference.png" alt="Community Icon" width="40"> <h3>Scam Awareness Platform</h3> <p>Community-driven platform where users share scam stories to protect others</p> </td> </tr> </table>
🛠️ Technology Stack
<div align="center">
🐍 Backend
<img src="https://img.icons8.com/color/48/000000/django.png" alt="Django" title="Django"> <img src="https://img.icons8.com/color/48/000000/python.png" alt="Python" title="Python"> <img src="https://img.icons8.com/color/48/000000/postgreesql.png" alt="PostgreSQL" title="PostgreSQL"> <img src="https://img.icons8.com/color/48/000000/api.png" alt="API" title="Django REST Framework">
⚛️ Frontend
<img src="https://img.icons8.com/color/48/000000/nextjs.png" alt="Next.js" title="Next.js"> <img src="https://img.icons8.com/color/48/000000/typescript.png" alt="TypeScript" title="TypeScript"> <img src="https://img.icons8.com/color/48/000000/tailwindcss.png" alt="Tailwind CSS" title="Tailwind CSS"> <img src="https://img.icons8.com/color/48/000000/react.png" alt="React" title="React"></div>
🚀 Installation & Setup
Prerequisites
<img src="https://img.icons8.com/color/24/000000/python.png" alt="Python" width="18"> Python 3.8 or higher

<img src="https://img.icons8.com/color/24/000000/nodejs.png" alt="Node.js" width="18"> Node.js 16 or higher

<img src="https://img.icons8.com/color/24/000000/postgreesql.png" alt="PostgreSQL" width="18"> PostgreSQL (optional - SQLite works for development)

Frontend Setup (Public Access)
bash
# Navigate to frontend directory
cd frontend/vigilante-scanner

# Install dependencies
npm install

# Start development server
npm run dev
🌐 Frontend will run at: http://localhost:3000

Backend Setup
bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows: venv\Scripts\activate
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
🔧 Backend will run at: http://localhost:8000

🎯 Usage
Start the frontend server (port 3000) and open your browser to http://localhost:3000

Enter a website URL in the scanner input field to view comprehensive security analysis including:

🎯 Risk Level (1-100 scale)

🔒 SSL Certificate Grade

📅 Domain Age information

🛡️ Security recommendations

Test URLs to Try:
🌐 https://google.com - Low risk, A grade

💻 https://github.com - Established domain

🧪 https://httpstat.us/200 - Various test cases

🔌 API Endpoints
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

🚫 Django admin panel: Private access only

🗄️ Database management: Admin access only

🔌 API endpoints: Limited to scanning functionality

🔐 Authentication: Protected admin routes

🛡️ Server configuration: Secured deployment

The public-facing application provides a secure and controlled interface while maintaining the privacy and security of the backend infrastructure.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

<p align="center"> <strong>Vigilante Scanner Project</strong> © 2023 | Created for a safer internet experience </p><p align="center"> <img src="https://img.icons8.com/fluency/48/000000/info.png" alt="Info" width="20"> <em>Note: This project is for educational and security research purposes only. Always ensure you have permission to scan websites and comply with all applicable laws and terms of service.</em> </p><div align="center">
