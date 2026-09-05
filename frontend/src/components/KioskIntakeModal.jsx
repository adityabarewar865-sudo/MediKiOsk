import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  RefreshCw, 
  ShieldCheck,
  Stethoscope,
  Pill,
  Leaf,
  Droplet
} from 'lucide-react';
import { submitIntakeAPI } from '../services/api';

export default function KioskIntakeModal({ 
  conditions, 
  preselectedConditionId, 
  onClose,
  onTokenGenerated,
  voiceEnabled 
}) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [tokenResult, setTokenResult] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [abhaId, setAbhaId] = useState('');
  
  const [selectedConditionId, setSelectedConditionId] = useState(
    preselectedConditionId || (conditions[0] ? conditions[0].id : 'fever-cold')
  );
  const [duration, setDuration] = useState('1-3 days');
  const [severity, setSeverity] = useState('Moderate');
  const [hasRedFlags, setHasRedFlags] = useState(false);
  const [preferredPathy, setPreferredPathy] = useState('Integrative (All 3)');

  const currentCondition = conditions.find(c => c.id === selectedConditionId);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter patient name.');
      return;
    }
    if (!age || isNaN(age)) {
      alert('Please enter valid age.');
      return;
    }

    setSubmitting(true);

    try {
      const data = await submitIntakeAPI({
        name: name.trim(),
        age: parseInt(age, 10),
        gender,
        phone: phone.trim() || undefined,
        abha_id: abhaId.trim() || undefined,
        chief_complaint_id: selectedConditionId,
        duration,
        severity,
        has_red_flags: hasRedFlags,
        red_flag_symptoms: hasRedFlags ? ['Acute severe discomfort or emergency alert checked'] : [],
        preferred_pathy: preferredPathy
      });

      setTokenResult(data);
      setStep(5); // Success step

      if (onTokenGenerated) {
        onTokenGenerated(data);
      }

      // Audio readout of token
      if (voiceEnabled && 'speechSynthesis' in window) {
        const text = `Token generated: ${data.token_id}. Please proceed to ${data.room_assigned}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      alert('Error submitting intake: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setTokenResult(null);
    setName('');
    setAge('');
    setHasRedFlags(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl border bg-slate-900/80 border-slate-800 light:bg-white light:border-slate-200 shadow-2xl">
      
      {/* Kiosk Header */}
      <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Self-Service OPD Kiosk
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white light:text-slate-900">
            {step === 5 ? 'Intake Complete & Token Issued' : 'Express Clinical Check-In'}
          </h2>
        </div>
        
        {step < 5 && (
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700">
            <span>Step {step} of 4</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="w-full bg-slate-800 light:bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      )}

      {/* ================= STEP 1: PATIENT DEMOGRAPHICS ================= */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-300 light:text-slate-700">
            Enter Basic Patient Details:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 light:text-slate-600 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-800/60 border-slate-700 light:bg-slate-50 light:border-slate-300 text-slate-100 light:text-slate-900 outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 light:text-slate-600 mb-1">
                Age (Years) *
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 34"
                min="1"
                max="115"
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-800/60 border-slate-700 light:bg-slate-50 light:border-slate-300 text-slate-100 light:text-slate-900 outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 light:text-slate-600 mb-1">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Male', 'Female', 'Other'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      gender === g
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 light:bg-cyan-50 light:text-cyan-800'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 light:bg-slate-100 light:border-slate-300 light:text-slate-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 light:text-slate-600 mb-1">
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-800/60 border-slate-700 light:bg-slate-50 light:border-slate-300 text-slate-100 light:text-slate-900 outline-none focus:border-cyan-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 light:text-slate-600 mb-1">
              ABHA ID (Ayushman Bharat Health Account - Optional)
            </label>
            <input
              type="text"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              placeholder="e.g. 91-4412-8812-9912 (Auto-generates if empty)"
              className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-800/60 border-slate-700 light:bg-slate-50 light:border-slate-300 text-slate-100 light:text-slate-900 outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                if (!name.trim() || !age) {
                  alert('Please enter Name and Age to proceed.');
                  return;
                }
                setStep(2);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Next: Symptom</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: SYMPTOM & DURATION ================= */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-300 light:text-slate-700">
            Select Chief Complaint & Duration:
          </div>

          <div>
            <label className="block text-xs text-slate-400 light:text-slate-600 mb-1.5">
              Primary Ailment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
              {conditions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedConditionId(c.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedConditionId === c.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold light:bg-cyan-50 light:text-cyan-800'
                      : 'bg-slate-800/40 border-slate-700/80 text-slate-300 light:bg-slate-100 light:border-slate-300 light:text-slate-700'
                  }`}
                >
                  <div className="font-bold truncate">{c.name}</div>
                  <div className="text-[10px] text-cyan-400/80 light:text-cyan-700">{c.hindi_name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs text-slate-400 light:text-slate-600 mb-1.5">
                How long have you had this?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['< 24 Hours', '1-3 Days', '1-2 Weeks', 'Over a Month'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      duration === d
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold light:bg-cyan-50 light:text-cyan-800'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 light:bg-slate-100 light:border-slate-300 light:text-slate-600'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 light:text-slate-600 mb-1.5">
                Severity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Mild', color: 'emerald' },
                  { label: 'Moderate', color: 'amber' },
                  { label: 'Severe', color: 'rose' }
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSeverity(s.label)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      severity === s.label
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 light:bg-cyan-50 light:text-cyan-800'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 light:bg-slate-100 light:border-slate-300 light:text-slate-600'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Next: Triage Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: RED-FLAG EMERGENCY CHECK ================= */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 light:text-rose-700 light:bg-rose-50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Emergency Screening (Triage Safety Protocol)</span>
            </div>
            <p className="text-xs">
              Are you currently experiencing any of the following severe emergency signs?
            </p>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Severe crushing chest pain radiating to left arm or jaw</li>
              <li>Extreme difficulty breathing or gasping for air</li>
              <li>Sudden facial drooping, speech loss, or body paralysis</li>
              <li>Loss of consciousness, seizures, or coughing blood</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => setHasRedFlags(false)}
              className={`p-4 rounded-2xl border text-center transition-all ${
                !hasRedFlags
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/40 light:bg-emerald-50 light:text-emerald-800'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 light:bg-slate-100 light:border-slate-300'
              }`}
            >
              <div className="text-base font-bold">NO, None of These</div>
              <div className="text-xs text-slate-400">Standard OPD routine consultation</div>
            </button>

            <button
              type="button"
              onClick={() => setHasRedFlags(true)}
              className={`p-4 rounded-2xl border text-center transition-all ${
                hasRedFlags
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-2 ring-rose-500/40 light:bg-rose-50 light:text-rose-800'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 light:bg-slate-100 light:border-slate-300'
              }`}
            >
              <div className="text-base font-bold text-rose-400">YES, Emergency Alert</div>
              <div className="text-xs text-slate-400">Immediate priority triage routing</div>
            </button>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Next: Treatment Preference</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: TREATMENT PREFERENCE & SUBMIT ================= */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-300 light:text-slate-700">
            Select Your Preferred Treatment Pathy:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'Integrative (All 3)', name: 'Integrative (All 3 Systems)', desc: 'Doctor reviews Allopathy, Ayurveda & Homeopathy', icon: Stethoscope, color: 'cyan' },
              { id: 'Allopathy', name: 'Allopathy 💊', desc: 'Modern scientific medicine for quick relief', icon: Pill, color: 'blue' },
              { id: 'Ayurveda', name: 'Ayurveda 🌿', desc: 'Natural herbal formulations and Dosha diet', icon: Leaf, color: 'emerald' },
              { id: 'Homeopathy', name: 'Homeopathy 💧', desc: 'Gentle constitutional micro-dose remedies', icon: Droplet, color: 'amber' }
            ].map((p) => {
              const Icon = p.icon;
              const isSelected = preferredPathy === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPreferredPathy(p.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500 light:bg-cyan-50 light:text-cyan-900'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600 light:bg-slate-100 light:border-slate-300 light:text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-100 light:text-slate-900">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{p.name}</span>
                  </div>
                  <div className="text-xs text-slate-400 light:text-slate-500 mt-1">
                    {p.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick confirmation recap */}
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 light:bg-slate-100 text-xs text-slate-300 light:text-slate-700 space-y-1">
            <div><strong>Patient:</strong> {name} ({age} yrs, {gender})</div>
            <div><strong>Complaint:</strong> {currentCondition?.name} • Duration: {duration}</div>
            <div><strong>Triage:</strong> {hasRedFlags ? '🚨 Red-Flag Emergency Triage' : 'Routine OPD Check-In'}</div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white shadow-xl shadow-cyan-500/25 active:scale-95 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Issuing Token...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Generate OPD Token Slip</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 5: SUCCESS SLIP & TOKEN ================= */}
      {step === 5 && tokenResult && (
        <div className="space-y-6 text-center">
          
          {/* Printable Ticket Slip */}
          <div className="p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 light:from-white light:to-slate-50 text-left space-y-4 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-sm text-cyan-400">MediKiosk Official OPD Token</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                tokenResult.triage_color === 'red' 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {tokenResult.triage_priority}
              </span>
            </div>

            {/* Giant Token ID */}
            <div className="text-center py-2">
              <div className="text-xs uppercase tracking-widest text-slate-400">Your Queue Token</div>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 tracking-wider">
                {tokenResult.token_id}
              </div>
              <div className="text-sm font-semibold text-slate-300 light:text-slate-700 mt-1">
                Assigned: <span className="text-cyan-400 font-bold">{tokenResult.room_assigned}</span>
              </div>
              <div className="text-xs text-slate-400">
                Estimated Wait: {tokenResult.est_wait_time}
              </div>
            </div>

            {/* Patient & Clinical Summary */}
            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-slate-800/40 light:bg-slate-100 border border-slate-700/60 light:border-slate-200">
              <div>
                <span className="text-slate-400">Patient:</span>
                <span className="font-bold text-slate-200 light:text-slate-800 ml-1">{tokenResult.clinical_summary.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Age / Gender:</span>
                <span className="font-bold text-slate-200 light:text-slate-800 ml-1">{tokenResult.clinical_summary.age_gender}</span>
              </div>
              <div>
                <span className="text-slate-400">Chief Complaint:</span>
                <span className="font-bold text-slate-200 light:text-slate-800 ml-1">{tokenResult.clinical_summary.chief_complaint}</span>
              </div>
              <div>
                <span className="text-slate-400">ABHA ID:</span>
                <span className="font-mono text-cyan-400 ml-1">{tokenResult.abha_id}</span>
              </div>
            </div>

            {/* Preliminary Pre-Triage Cross-Pathy Suggestions for Doctor */}
            <div className="p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 light:bg-cyan-50 text-xs space-y-1">
              <span className="font-bold text-cyan-400 light:text-cyan-800 block">Pre-Filled Solutions for Doctor Review:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="p-1.5 rounded-lg bg-slate-800/60 light:bg-white">
                  <span className="text-blue-400 font-bold block">Allopathy:</span>
                  <span className="text-slate-300 light:text-slate-700">{tokenResult.clinical_summary.suggested_solutions.allopathy_firstline}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-800/60 light:bg-white">
                  <span className="text-emerald-400 font-bold block">Ayurveda:</span>
                  <span className="text-slate-300 light:text-slate-700">{tokenResult.clinical_summary.suggested_solutions.ayurveda_herbal}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-800/60 light:bg-white">
                  <span className="text-amber-400 font-bold block">Homeopathy:</span>
                  <span className="text-slate-300 light:text-slate-700">{tokenResult.clinical_summary.suggested_solutions.homeopathy_constitutional}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 light:bg-slate-200 light:text-slate-800 light:border-slate-300 transition-all"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Token Slip</span>
            </button>

            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Patient Check-In</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
