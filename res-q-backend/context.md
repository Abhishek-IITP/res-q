

**PROJECT TITLE:** Res-Q — Smart Medical Emergency Response System

---

## 🧠 PROJECT OVERVIEW

Res-Q is a full-stack medical emergency response system designed to assist unconscious or injured individuals by enabling instant access to their critical medical information and notifying their emergency contacts using a QR-code-based identification system.

The system bridges the gap between **physical incidents (accidents)** and **digital response systems (alerts, AI verification, and communication)**.

---

## 🎯 CORE OBJECTIVE

To provide a **fast, reliable, and automated emergency response mechanism** that:

1. Identifies a victim using a QR code
2. Displays critical medical data instantly
3. Allows bystanders to report incidents
4. Verifies emergencies using AI
5. Notifies emergency contacts with location

---

## 🧱 SYSTEM ARCHITECTURE

### Backend:

* Runtime: Bun
* Language: TypeScript
* Framework: Express
* Database: PostgreSQL
* ORM: Prisma (v7 with adapter)
* File Upload: Multer
* QR Generation: qrcode package

### Frontend (initial phase):

* Static HTML (served via `res.sendFile`)
* Later upgrade: React

---

## 🧩 DATABASE DESIGN

### User Model

Stores personal + medical information:

* fullName
* phone (unique identifier)
* bloodGroup
* allergies[]
* conditions[]
* medications[]
* vehicle details
* qrCodeUrl
* isVerified

---

### EmergencyContact Model

Stores up to 3 contacts per user:

* name
* phone
* relation
* linked via userId

---

### OTP Model

Handles phone verification:

* phone
* otp
* expiresAt
* verified

---

### EmergencyLog Model

Stores emergency reports:

* userId
* imageUrl
* location (lat, lng)
* AI confidence score
* IP address (for misuse tracking)

---

## 🔄 COMPLETE SYSTEM FLOW

---

### 1️⃣ USER REGISTRATION

User enters:

* fullName
* phone

Backend:

* checks if phone exists
* creates user if new
* sends OTP (next step)

---

### 2️⃣ OTP VERIFICATION

Flow:

* generate OTP
* store in DB
* verify OTP
* mark user as verified

---

### 3️⃣ PROFILE COMPLETION

User updates:

* blood group
* allergies
* medical conditions
* medications
* vehicle info
* emergency contacts (max 3)

---

### 4️⃣ QR CODE GENERATION

Backend:

* generates QR using userId
* QR contains:
  /emergency/{userId}

Important:
QR does NOT store sensitive data

---

### 5️⃣ QR USAGE (REAL-WORLD SCENARIO)

In case of accident:

1. Bystander scans QR
2. Opens:
   /emergency/{userId}
3. Backend serves HTML page
4. Page fetches user data
5. Displays:

   * name
   * blood group
   * contacts

---

### 6️⃣ EMERGENCY REPORT FLOW

From emergency page:

User (bystander) can:

* upload accident image
* allow location access

Frontend sends:

* image
* latitude & longitude
* userId

---

### 7️⃣ BACKEND EMERGENCY HANDLING

Backend:

* stores emergency log
* saves:

  * image
  * location
  * IP address

---

### 8️⃣ AI VERIFICATION (PLANNED)

AI Model:

* checks uploaded image
* detects accident validity
* returns confidence score

If valid:

* proceed to alert system

---

### 9️⃣ ALERT SYSTEM (PLANNED)

If AI confirms emergency:

System sends:

* SMS to emergency contacts
* includes:

  * user name
  * location (Google Maps link)
  * alert message

Optional:

* proxy call system (hide number)

---

## 🔐 SECURITY & SAFETY DESIGN

* QR contains only userId (no sensitive data)
* Phone-based identity (unique constraint)
* OTP verification system
* IP logging for misuse tracking
* Limited emergency contacts (max 3)

---

## ⚙️ API DESIGN SUMMARY

### User

* POST /api/users/register
* GET /api/users/:id
* PUT /api/users/:id

### OTP

* POST /api/otp/send
* POST /api/otp/verify

### Emergency Contacts

* POST /api/emergency-contacts/add

### Emergency

* POST /api/emergency/report

---

## 🧠 KEY DESIGN PRINCIPLES

1. Minimal data in QR → fetch from backend
2. Progressive data collection → better UX
3. Separation of concerns → MVC architecture
4. Real-world usability → fast access in emergencies
5. Scalable backend → microservice-ready

---

## 🚀 FUTURE ENHANCEMENTS

* Cloudinary for image storage
* AI model (accident detection)
* SMS integration (Twilio / Fast2SMS)
* Real-time location tracking
* Hospital & police integration
* Mobile app version

---

## 💡 PROJECT IMPACT

This system can:

* Reduce emergency response time
* Provide critical medical data instantly
* Save lives through faster communication
* Prevent misuse via tracking and AI verification

---

## 🧾 SUMMARY

Res-Q is a **real-world applicable, scalable emergency response platform** combining:

* QR-based identity
* Backend intelligence
* AI validation
* Automated alert system

It transforms a simple QR scan into a **life-saving workflow**.

---
## 🛠️ SETUP INSTRUCTIONS

convert this into next js , like migrate the backend to Next.js API routes and serve the frontend as a Next.js app.