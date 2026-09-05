import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RefreshCw,
  Eye,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { scanDocumentAPI } from '../services/api';

export default function PrescriptionScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeSample, setActiveSample] = useState('prescription'); // 'prescription' | 'lab_report'

  const runScan = async (sampleType) => {
    setScanning(true);
    setActiveSample(sampleType);
    try {
      const data = await scanDocumentAPI(sampleType);
      // add small realistic animation delay
      setTimeout(() => {
        setScanResult(data);
        setScanning(false);
      }, 600);
    } catch (err) {
      alert('Error during OCR digitization: ' + err.message);
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl border bg-slate-900/60 border-slate-800 light:bg-white light:border-slate-200 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Module B • Medical Document Intelligence
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white light:text-slate-900 mt-1">
              Prescription & Lab OCR Digitizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
              Digitize physical prescriptions, extract medications across Allopathy, Ayurveda & Homeopathy, and highlight out-of-range lab tests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              ABDM FHIR Compatible
            </span>
          </div>
        </div>
      </div>

      {/* Upload / Demo Selector Box */}
      <div className="p-6 rounded-3xl border border-dashed border-slate-700 light:border-slate-300 bg-slate-900/40 light:bg-slate-50 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
          <UploadCloud className="w-7 h-7" />
        </div>
        
        <div>
          <h3 className="font-bold text-base text-white light:text-slate-900">
            Scan Document or Try Realistic Pre-sets
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-600 max-w-md mx-auto mt-1">
            Tap either preset to see immediate AI extraction of handwritten medications and abnormal lab flags.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => runScan('prescription')}
            disabled={scanning}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              activeSample === 'prescription' && scanResult
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 light:bg-white light:border-slate-300 light:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Scan Multi-Pathy Prescription</span>
          </button>

          <button
            onClick={() => runScan('lab_report')}
            disabled={scanning}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              activeSample === 'lab_report' && scanResult
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 light:bg-white light:border-slate-300 light:text-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>Scan Blood Lab Report</span>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {scanning && (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-200 light:text-slate-800">
            Running OCR & Medical Entity Extraction...
          </p>
          <p className="text-xs text-slate-400">
            Detecting medication names, dosage frequencies, and out-of-range reference thresholds.
          </p>
        </div>
      )}

      {/* Scan Results Display */}
      {!scanning && scanResult && (
        <div className="p-6 rounded-3xl border bg-slate-900/60 border-slate-800 light:bg-white light:border-slate-200 shadow-2xl space-y-5">
          
          {/* Result Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 light:border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Extracted Document
              </span>
              <h3 className="text-lg font-bold text-white light:text-slate-900">
                {scanResult.document_type}
              </h3>
              <div className="text-xs text-slate-400 mt-0.5">
                Date: {scanResult.date} • {scanResult.hospital_detected || scanResult.patient_detected}
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {scanResult.timeline_entry}
            </span>
          </div>

          {/* If Prescription: Extracted Medications */}
          {scanResult.extracted_medications && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Parsed Medications (Multi-Pathy Categorized)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scanResult.extracted_medications.map((med, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 light:bg-slate-50 light:border-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-100 light:text-slate-900">
                        {med.name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        med.pathy === 'Allopathy' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : med.pathy === 'Ayurveda' 
                            ? 'bg-emerald-500/20 text-emerald-300' 
                            : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {med.pathy}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 light:text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{med.frequency}</span>
                      <span className="text-slate-500">• {med.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If Lab Report: Abnormal Highlights */}
          {scanResult.abnormal_highlights && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Biomarkers & Lab Reference Ranges
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scanResult.abnormal_highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border space-y-1.5 ${
                      item.severity === 'red'
                        ? 'bg-rose-500/10 border-rose-500/30 light:bg-rose-50'
                        : item.severity === 'amber'
                          ? 'bg-amber-500/10 border-amber-500/30 light:bg-amber-50'
                          : 'bg-emerald-500/10 border-emerald-500/30 light:bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-100 light:text-slate-900">
                        {item.test}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                        item.severity === 'red' 
                          ? 'bg-rose-500 text-white' 
                          : item.severity === 'amber' 
                            ? 'bg-amber-500 text-slate-950' 
                            : 'bg-emerald-500 text-white'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-base font-black text-white light:text-slate-900">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-slate-400 light:text-slate-500">
                      Normal Range: {item.reference}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Clinical Summary Insight */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 light:bg-cyan-50 text-xs text-slate-200 light:text-slate-800 space-y-1">
            <span className="font-bold text-cyan-400 light:text-cyan-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              MediKiosk Cross-Pathy Synthesis:
            </span>
            <p>{scanResult.ai_clinical_insight}</p>
          </div>

        </div>
      )}

    </div>
  );
}
