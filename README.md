<div align="center">
  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" alt="CareBuddy Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  <h1>CareBuddy 🌿</h1>
  <p><strong>A zero-barrier AI health companion built for the 800M+ underserved Indians.</strong></p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![MediaPipe](https://img.shields.io/badge/Google_MediaPipe-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)
</div>

<br />

> **Innovation Challenge Theme:** AI for Good — *AI for Health & Well-being*  
> **Submission Deadline:** 2nd August 2026, 8:00 AM

---

## 🌍 The Problem
Over **800 million Indians** live in rural and semi-urban areas and are entirely excluded by modern health technology. Why? Because existing apps assume:
1. You speak English.
2. You have a fast, reliable internet connection.
3. You can navigate complex user interfaces.

When these users get sick, their medical history is lost in paper files, leading to poor and delayed diagnoses.

## 🚀 The Solution: CareBuddy
CareBuddy is an intelligent, offline-capable health platform that acts as a personalized health record and intelligent triage assistant. It moves beyond isolated reports to provide a longitudinal **AI Health Timeline** that actually understands symptom progression over time.

### ✨ Key Features
- **🧠 AI Health Timeline:** A longitudinal record of health events. The AI understands the context of past symptoms (e.g., a mild fever escalating to a persistent cough over 5 days) and intelligently flags when emergency medical attention is necessary.
- **🗣️ Multilingual Voice AI:** Users can talk to CareBuddy in their native dialect (Hindi, Tamil, Bhojpuri, etc.) using just their voice—completely bypassing the need to type or navigate UIs.
- **⌚ Smartwatch Vitals Sync (Health Connect):** Integrates wearable data (Heart Rate, SpO₂, Sleep, Steps) to provide an AI Health Score and contextual wellness insights.
- **🧘‍♀️ Abhyaas (Posture Coach):** On-device AI (MediaPipe) that helps with physical therapy and yoga, processing instantly with no internet upload required (**99.3% accuracy**).
- **📶 Offline-First Emergency Guide:** A critical first-aid guide fully available *without an internet connection*.
- **🤝 Community Camps:** Localized health initiatives ensuring preventive care reaches the grassroots level.

---

## 🛠️ Setup Instructions

CareBuddy features a built-in API proxy middleware in Vite for seamless local development, as well as native support for Vercel Serverless Functions in production.

### 1. Clone the repository
```bash
git clone https://github.com/isharmamudit/projectG1.git
cd projectG1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (or copy `.env.example`):
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Start the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser. All AI endpoints (`/api/*`) are handled automatically.

---

## 🤖 AI Usage Disclosure

As per the hackathon **AI Usage Policy**, the following AI tools were utilized during the development of this project:

| Tool | Purpose | Extent of Contribution |
| :--- | :--- | :--- |
| **Claude / Claude Code (Anthropic)** | Used for architecture planning, component generation, debugging, UI/UX implementation, and documentation. | **Substantial.** Most of the frontend React code, complex UI animations (Framer Motion), and logic debugging were heavily assisted by Claude Code to accelerate development during the hackathon window. |
| **Groq API / Llama 3** | Powers the core runtime intelligence of the application, including symptom triage logic and native language transcription analysis. | **Core Product Dependency.** Used dynamically at runtime, not as a development aid. |
| **MediaPipe (Google)** | Pre-trained pose landmark model used at runtime for the *Abhyaas* posture coach. | **Core Product Dependency.** Executed entirely in the browser for privacy-preserving, offline pose recognition. |

---

## 🔬 Technical Appendix: SEHAT Architecture & Safety

Because health tech requires extreme safety, CareBuddy implements hardcoded safety rails:
1. **Never Diagnoses:** The triage prompt explicitly forbids diagnosis, medication, or dosage recommendations. It only outputs an *urgency level* and a *next step*.
2. **Deterministic Red-Flag Engine:** `src/lib/sehat/redflags.ts` matches 14 emergency categories across multiple Indian languages. **On a hit, the chat halts and no model call is made.** The user is instantly routed to emergency services.
3. **Privacy First:** Pose recognition (Abhyaas) runs entirely on the client's local device. No video frames are ever uploaded to a server.
