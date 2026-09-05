# MediKiosk: AI Clinical Intake & Multi-Pathy Solutions Platform

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/adityabarewar865-sudo/MediKiOsk)

An AI-powered clinical intake and cross-pathy healthcare web platform built for high-density hospital outpatient departments (OPDs) and AYUSH clinics. It simplifies clinical history taking and provides clear, comparative remedies across **Allopathy**, **Ayurveda**, and **Homeopathy** without cognitive clutter.

---

## Key Features

1. **Clean & Intuitive Card-Based UI**
   - Built to prevent cognitive overload (*no long walls of text*).
   - Touch-friendly symptom selector chips and category filters.
   - Clean badges, dosing indicators, and actionable points.

2. **Default Dark Mode with Instant Light Toggle**
   - **Default theme**: Sleek, high-contrast dark medical aesthetic.
   - **Light Mode Toggle**: Top header switch with immediate state transition and `localStorage` persistence.

3. **Multi-Pathy Solutions Engine**
   - 💊 **Allopathy (Modern Medicine)**: Frontline medicines (e.g. Paracetamol, Pantoprazole, Levocetirizine), dosages, mechanisms, precautions.
   - 🌿 **Ayurveda (Natural & Dosha Balance)**: Target Dosha (Vata/Pitta/Kapha), classical herbal formulations (e.g. Maha Sudarshan Vati, Avipattikar Churna, Yograj Guggulu), and Ahara-Vihara diet/lifestyle tips.
   - 💧 **Homeopathy (Constitutional Care)**: Targeted constitutional remedies (e.g. Belladonna 30C, Nux Vomica 30C, Passiflora Q), potencies, and the golden dosing rules.

4. **Self-Service Kiosk Intake & Triage**
   - Step-by-step touch self-registration (Demographics, Symptom duration, Severity).
   - Red-Flag emergency screening (crushing chest pain, severe dyspnea, acute neurological deficits).
   - Instant token issuance (e.g., `MED-104`), room assignment, estimated wait time, and printable clinical slip.

5. **Medical Document & Prescription Scanner**
   - Module B OCR digitization demo.
   - Parses multi-pathy medications and flags abnormal laboratory biomarkers (e.g. Fasting Glucose HIGH, HbA1c HIGH).

6. **Physician OPD Desk & Pre-Elicited Histories**
   - Real-time queue view for OPD doctors with priority pills (`P1 Emergency`, `P2 Priority`, `P3 Routine`).
   - One-click inspection of pre-filled clinical histories, reducing 5-minute intake interviews down to seconds.

7. **Audio Voice Assistant & Emergency SOS**
   - Text-to-speech audio readout for accessibility (vital for low-literacy patients).
   - Direct emergency dialers for `108` (Govt Ambulance) and `112`.

---

## Quick Start Guide

### Option 1: Run Full App with Python (Recommended)
This runs the FastAPI backend and serves the compiled React frontend together on port 8000.

```bash
python run_app.py
```
Then open: **http://localhost:8000**  
Interactive API Docs: **http://localhost:8000/docs**

---

### Option 2: Run Development Mode (Vite + FastAPI)

1. **Start Backend Server**:
   ```bash
   python -m uvicorn backend.main:app --port 8000 --reload
   ```

2. **Start Frontend Dev Server**:
   ```bash
   cd frontend
   npm.cmd run dev
   ```
   Open: **http://localhost:5173** (API calls are automatically proxied to port 8000).

---

## Tech Stack
- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons, Web Speech API.
- **Backend**: Python 3, FastAPI, Uvicorn, Pydantic.
- **Architecture**: ABDM/FHIR-compatible data models, DPDP Act 2023 privacy compliance.
