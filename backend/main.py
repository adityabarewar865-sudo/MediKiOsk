import os
import uuid
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from backend.data.solutions_db import (
    CONDITIONS_DB,
    CONDITIONS_MAP,
    get_all_conditions,
    get_condition_details,
    search_conditions
)

app = FastAPI(
    title="MediKiosk AI API",
    description="Backend API for Clinical Intake, Multi-Pathy Remedies (Allopathy, Ayurveda, Homeopathy), and OPD Triage",
    version="1.0.0"
)

# CORS setup for local development and frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for Kiosk session tokens and triaged patients
ACTIVE_SESSIONS = []

# Mock initial OPD patients to give rich interactive experience to the Doctor OPD screen
INITIAL_MOCK_PATIENTS = [
    {
        "token_id": "MED-101",
        "timestamp": "08:45 AM",
        "name": "Ramesh Verma",
        "age": 52,
        "gender": "Male",
        "abha_id": "91-4829-1029-4412",
        "chief_complaint": "Acidity, Gas & Heartburn",
        "duration": "4 days",
        "severity": "Moderate",
        "triage_priority": "P3 - Routine",
        "triage_color": "emerald",
        "red_flag_alert": False,
        "preferred_pathy": "Ayurveda & Allopathy",
        "preliminary_notes": "Epigastric burning post meals, no chest radiation. Normal vitals. Prescribed Avipattikar & Pantoprazole."
    },
    {
        "token_id": "MED-102",
        "timestamp": "09:05 AM",
        "name": "Sunita Devi",
        "age": 44,
        "gender": "Female",
        "abha_id": "91-3019-8812-9014",
        "chief_complaint": "Joint & Knee Pain",
        "duration": "3 weeks",
        "severity": "Moderate",
        "triage_priority": "P2 - Priority",
        "triage_color": "amber",
        "red_flag_alert": False,
        "preferred_pathy": "Ayurveda & Homeopathy",
        "preliminary_notes": "Bilateral knee stiffness, aggravated in morning. Vata aggravation. Suggesting Yograj Guggulu & Rhus Tox."
    },
    {
        "token_id": "MED-103",
        "timestamp": "09:20 AM",
        "name": "Anil Sharma",
        "age": 61,
        "gender": "Male",
        "abha_id": "91-7712-4411-9923",
        "chief_complaint": "Fever & Common Cold",
        "duration": "2 days",
        "severity": "Mild",
        "triage_priority": "P3 - Routine",
        "triage_color": "emerald",
        "red_flag_alert": False,
        "preferred_pathy": "Allopathy",
        "preliminary_notes": "Temp 100.2°F, clear throat, normal chest sound. Paracetamol 650mg + hydration."
    }
]

ACTIVE_SESSIONS.extend(INITIAL_MOCK_PATIENTS)


class PatientIntakeRequest(BaseModel):
    name: str = Field(..., example="Pooja Patel")
    age: int = Field(..., ge=1, le=120, example=29)
    gender: str = Field("Other", example="Female")
    phone: Optional[str] = Field(None, example="9876543210")
    abha_id: Optional[str] = Field(None, example="14-digit ABHA or Auto-generated")
    chief_complaint_id: str = Field(..., example="fever-cold")
    duration: str = Field("1-3 days", example="2 days")
    severity: str = Field("Mild", example="Moderate")
    has_red_flags: bool = Field(False)
    red_flag_symptoms: List[str] = Field(default_factory=list)
    preferred_pathy: str = Field("All", example="Allopathy")
    notes: Optional[str] = Field("")


class OCRScanRequest(BaseModel):
    sample_type: Optional[str] = Field("prescription", example="prescription")
    custom_text: Optional[str] = None


@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "MediKiosk AI Backend",
        "version": "1.0.0",
        "supported_pathies": ["Allopathy", "Ayurveda", "Homeopathy"],
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/conditions")
def list_conditions(
    search: Optional[str] = Query(None, description="Search term for illness or symptom"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    """Get all medical conditions with clean brief metadata."""
    if search:
        items = search_conditions(search)
    else:
        items = get_all_conditions()

    if category and category != "All":
        items = [i for i in items if category.lower() in i.get("category", "").lower()]

    categories = sorted(list({c["category"] for c in CONDITIONS_DB}))
    return {
        "total": len(items),
        "categories": ["All"] + categories,
        "conditions": items
    }


@app.get("/api/solutions/{condition_id}")
def get_solution(condition_id: str):
    """Retrieve full comparative solutions: Allopathy, Ayurveda, and Homeopathy."""
    data = get_condition_details(condition_id)
    if not data:
        raise HTTPException(status_code=404, detail=f"Condition '{condition_id}' not found.")
    return data


@app.post("/api/intake")
def process_intake(intake: PatientIntakeRequest):
    """
    Simulates Kiosk self-intake:
    - Analyzes symptoms and red flags
    - Assigns triage priority
    - Generates ABDM/HIS patient token and doctor-ready summary
    """
    condition = get_condition_details(intake.chief_complaint_id)
    condition_name = condition["name"] if condition else intake.chief_complaint_id

    # Red flag assessment
    if intake.has_red_flags or intake.severity.lower() == "severe" or len(intake.red_flag_symptoms) > 0:
        priority = "P1 - EMERGENCY"
        priority_color = "red"
        room_assigned = "Emergency Triage Room 1"
        est_wait = "Immediate (0 mins)"
    elif intake.severity.lower() == "moderate":
        priority = "P2 - Priority"
        priority_color = "amber"
        room_assigned = "OPD Room 4"
        est_wait = "5 - 10 mins"
    else:
        priority = "P3 - Routine"
        priority_color = "emerald"
        room_assigned = "OPD General Room 2"
        est_wait = "10 - 15 mins"

    token_number = f"MED-{len(ACTIVE_SESSIONS) + 101}"
    assigned_abha = intake.abha_id if intake.abha_id and len(intake.abha_id) > 6 else f"91-{uuid.uuid4().hex[:4].upper()}-{uuid.uuid4().hex[4:8].upper()}-{uuid.uuid4().hex[8:12].upper()}"

    # Build concise physician-ready clinical summary (No wall of text)
    doctor_summary = {
        "patient_token": token_number,
        "abha_id": assigned_abha,
        "name": intake.name,
        "age_gender": f"{intake.age} yrs / {intake.gender}",
        "chief_complaint": condition_name,
        "duration": intake.duration,
        "severity": intake.severity,
        "triage_priority": priority,
        "triage_color": priority_color,
        "emergency_alert": intake.has_red_flags or len(intake.red_flag_symptoms) > 0,
        "red_flag_notes": intake.red_flag_symptoms,
        "preferred_system": intake.preferred_pathy,
        "suggested_solutions": {
            "allopathy_firstline": condition["allopathy"]["medicines"][0]["name"] if condition else "Standard Supportive Care",
            "ayurveda_herbal": condition["ayurveda"]["medicines"][0]["name"] if condition else "Dosha Balancing Regimen",
            "homeopathy_constitutional": condition["homeopathy"]["medicines"][0]["name"] if condition else "Constitutional Drop"
        },
        "submitted_at": datetime.now().strftime("%I:%M %p")
    }

    # Save to active session queue
    session_record = {
        "token_id": token_number,
        "timestamp": doctor_summary["submitted_at"],
        "name": intake.name,
        "age": intake.age,
        "gender": intake.gender,
        "abha_id": assigned_abha,
        "chief_complaint": condition_name,
        "duration": intake.duration,
        "severity": intake.severity,
        "triage_priority": priority,
        "triage_color": priority_color,
        "red_flag_alert": doctor_summary["emergency_alert"],
        "preferred_pathy": intake.preferred_pathy,
        "preliminary_notes": f"{condition_name} ({intake.duration}). Severity: {intake.severity}. Suggested: {doctor_summary['suggested_solutions']['allopathy_firstline']} / {doctor_summary['suggested_solutions']['ayurveda_herbal']}"
    }
    ACTIVE_SESSIONS.insert(0, session_record)

    return {
        "success": True,
        "token_id": token_number,
        "abha_id": assigned_abha,
        "room_assigned": room_assigned,
        "est_wait_time": est_wait,
        "triage_priority": priority,
        "triage_color": priority_color,
        "clinical_summary": doctor_summary,
        "message": "Clinical intake successfully submitted to OPD triage."
    }


@app.get("/api/tokens")
def get_active_tokens():
    """Retrieve all OPD tokens currently queued for physician review."""
    return {
        "count": len(ACTIVE_SESSIONS),
        "tokens": ACTIVE_SESSIONS
    }


@app.post("/api/scan-rx")
def analyze_prescription_ocr(req: OCRScanRequest):
    """
    Simulated AI document digitization engine:
    Extracts medications, dosages, and abnormal lab biomarkers with out-of-range flags.
    """
    if req.sample_type == "lab_report":
        return {
            "document_type": "Laboratory Blood Investigation",
            "date": datetime.now().strftime("%d %b %Y"),
            "patient_detected": "Suresh Nair (48M)",
            "abnormal_highlights": [
                {"test": "Fasting Blood Glucose", "value": "158 mg/dL", "reference": "70 - 99 mg/dL", "status": "HIGH", "severity": "red"},
                {"test": "HbA1c (Glycated Hemoglobin)", "value": "8.2 %", "reference": "< 5.7 %", "status": "HIGH", "severity": "red"},
                {"test": "Serum Creatinine", "value": "1.05 mg/dL", "reference": "0.7 - 1.2 mg/dL", "status": "NORMAL", "severity": "emerald"},
                {"test": "Total Cholesterol", "value": "224 mg/dL", "reference": "< 200 mg/dL", "status": "BORDERLINE HIGH", "severity": "amber"}
            ],
            "ai_clinical_insight": "Elevated glycemic indices. Recommend Metformin titration in Allopathy and Karela-Jamun / Chandraprabha Vati in Ayurveda with low-glycemic Ahara.",
            "timeline_entry": "Lab Report added to ABHA Digital Health Locker."
        }
    else:
        return {
            "document_type": "Prior OPD Doctor Prescription",
            "date": "14 Aug 2026",
            "hospital_detected": "Civil Government Hospital OPD",
            "doctor_specialty": "General Medicine / Ayush Integrative OPD",
            "extracted_medications": [
                {"name": "Tab. Pantoprazole 40mg", "frequency": "1-0-0 (Empty Stomach)", "duration": "14 Days", "pathy": "Allopathy"},
                {"name": "Syp. Aristozyme", "frequency": "10ml Twice Daily post meals", "duration": "10 Days", "pathy": "Allopathy"},
                {"name": "Avipattikar Churna 5g", "frequency": "Bedtime with warm water", "duration": "1 Month", "pathy": "Ayurveda"},
                {"name": "Nux Vomica 30C", "frequency": "4 pills at night SOS", "duration": "As needed", "pathy": "Homeopathy"}
            ],
            "allergy_warning": "No known drug allergies detected on slip.",
            "ai_clinical_insight": "Patient has recurrent dyspeptic symptoms managed through integrative triple-modality care.",
            "timeline_entry": "Medication history synced with OPD Token."
        }


@app.get("/api/stats")
def get_kiosk_stats():
    """Live OPD throughput and kiosk performance statistics."""
    return {
        "patients_processed_today": len(ACTIVE_SESSIONS) + 184,
        "avg_intake_time_mins": 1.7,
        "doctor_time_saved_per_patient_mins": 4.5,
        "emergency_red_flags_intercepted": 6,
        "pathy_interest": {
            "allopathy": "42%",
            "ayurveda": "36%",
            "homeopathy": "22%"
        },
        "top_conditions": [
            "Fever & Common Cold",
            "Acidity & GERD",
            "Joint & Knee Pain",
            "Headache & Migraine"
        ]
    }


# Serve built React frontend if dist folder exists
DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.exists(DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="static-assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Don't intercept API routes
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="Not Found")
        file_path = os.path.join(DIST_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))
