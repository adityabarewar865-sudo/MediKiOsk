"""
MediKiosk Runner Script
Starts FastAPI backend server on http://localhost:8000
Serves both the API and the React frontend.
"""
import sys
import uvicorn

if __name__ == "__main__":
    print("=" * 65)
    print("  MediKiosk - AI Clinical Intake & Multi-Pathy Platform")
    print("  Frontend & Backend running at: http://localhost:8000")
    print("  API Docs available at:        http://localhost:8000/docs")
    print("  Default Theme: Dark Mode (Toggleable to Light Mode)")
    print("  Supported Pathies: Allopathy, Ayurveda, Homeopathy")
    print("=" * 65)
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
