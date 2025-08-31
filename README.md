# 🔍 Vigilante Scanner - Advanced Website Security Scanner  

## 📌 Project Overview  
This project analyzes **website security vulnerabilities** using a **full-stack web application**.  
The system performs **comprehensive security scanning, SSL certificate grading, and domain risk assessment**, while also providing a **community platform for scam awareness and protection**.  

---
---

## 📸 Screenshots  

### 🔹 Dashboard View  
![Dashboard](Images/Screenshot%20v1.png)  

### 🔹 Community Platform  
![Community](Images/Screenshot%20v2.png)
---

## 🛠 Steps Performed  

### 1. Frontend Development  
- Built responsive UI with **Next.js 15+** and **TypeScript**  
- Implemented real-time security dashboard  
- Created community scam awareness platform  
- Designed modern interface with **Tailwind CSS**  

### 2. Backend Development  
- Developed **Django REST API** for security scanning  
- Implemented **SSL/TLS certificate analysis and validation**  
- Integrated **WHOIS domain registration lookup system**  
- Created database models for scan history and user reports  

### 3. Security Features Implemented  
- Real-time website security scanning engine  
- SSL certificate grading system (**A+, A, B, C, F**)  
- Domain age detection and risk assessment algorithms  
- Comprehensive security reporting system  

### 4. Community Platform Development  
- User authentication and profile management  
- Scam story sharing and moderation system  
- Community rating and feedback features  
- Awareness dashboard with recent scam alerts  

---

## 🛠️ Technology Stack Used  
- **Frontend Framework** → Next.js 15+ with TypeScript  
- **Backend Framework** → Django 4.2+ with REST API  
- **Styling** → Tailwind CSS for modern UI  
- **Database** → PostgreSQL (SQLite for development)  
- **Security Analysis** → SSL/TLS validation, WHOIS integration  
- **Deployment** → Responsive design, cross-browser compatibility  

---

## 🎯 Key Features Delivered  
- **Real-time Security Scanning** – Instant website vulnerability assessment  
- **SSL Certificate Analysis** – Comprehensive TLS/SSL grading system  
- **Risk Assessment Scoring** – Intelligent 1-100 risk evaluation  
- **Domain Age Detection** – WHOIS-based registration history analysis  
- **Community Platform** – Scam awareness sharing and protection  
- **Historical Data Storage** – Permanent scan history storage  
- **Interactive Dashboard** – User-friendly security interface  

---

## 🚀 Installation & Implementation  

### ✅ Prerequisites Required  
- Python **3.8 or higher**  
- Node.js **16 or higher**  
- PostgreSQL (**SQLite works for development**)  

---

### 🔧 Frontend Implementation  

cd frontend/vigilante-scanner

Frontend runs at: http://localhost:3000
---

##⚙️ Backend Implementation
  cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend runs at: http://localhost:8000
----

📊 API Endpoints Developed
🔹 POST /api/scan/

Website security analysis endpoint


{
  "url": "https://example.com"
}

Response:


{
  "riskLevel": 35,
  "riskCategory": "medium",
  "sslGrade": "A",
  "domainAge": 5,
  "domain": "example.com",
  "scanId": 42,
  "message": "Scan completed successfully"
}

## 📁 Project Structure

frontend/   → Next.js frontend application
backend/    → Django backend API
images/     → Screenshots and application assets
README.md   → Comprehensive project documentation
LICENSE     → MIT License file

📜 License

This project is licensed under the MIT License – see the LICENSE
 file for details.

🔒 Backend Security Notice
The backend administration and database management systems are private and secured. Public access is limited to the API endpoints required for the scanning functionality only.

Access Restrictions:

Django admin panel: Private access only
Database management: Admin access only
API endpoints: Limited to scanning functionality
Authentication: Protected admin routes
Server configuration: Secured deployment

## ✅ Conclusion

Vigilante Scanner provides a powerful and user-friendly platform for analyzing website security, grading SSL certificates, and detecting domain-related risks.
By combining real-time scanning, risk assessment, and a community-driven awareness system, it not only enhances individual website safety but also helps in building collective protection against scams and cyber threats.

This project can be extended further by:

Adding AI-powered phishing detection

Integrating automated malware scanning

Enhancing community-driven scam reporting with trust scores

Together, we can make the web a safer place for everyone. 🌐🔐
