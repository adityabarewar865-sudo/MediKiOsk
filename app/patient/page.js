'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerPatientAndQueue } from '@/lib/opdService'
import {
  User,
  Calendar,
  Heart,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Printer,
  Sparkles,
  Utensils,
  Moon,
  Activity,
  ArrowRight,
  RefreshCw,
  Stethoscope
} from 'lucide-react'

export default function PatientPortal() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submittedData, setSubmittedData] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    abhaId: '',
    complaints: '',
    timeline: '',
    diet: 'Satmya & Shuddha (Balanced vegetarian)',
    sleep: 'Prakrutha (Sound sleep, 7-8 hours)',
    bowel: 'Madhyama (Normal regular digestion)'
  })

  const commonComplaints = [
    'Amlapitta (Acidity / Heartburn)',
    'Sandhivata (Joint Pain & Stiffness)',
    'Shirahshoola (Headache / Migraine)',
    'Kasa & Shwasa (Cough / Breathing distress)',
    'Twak Roga (Skin rash / Eczema)',
    'Vibandha (Chronic Constipation)',
    'Sthaulya (Weight gain / Obesity)',
    'Pratishyaya (Sinusitis / Allergy)'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuickComplaint = (item) => {
    setFormData(prev => ({
      ...prev,
      complaints: prev.complaints ? `${prev.complaints}, ${item}` : item
    }))
  }

  // Validation
  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter the patient full name.')
      return false
    }
    if (!formData.age || isNaN(formData.age) || parseInt(formData.age, 10) < 1 || parseInt(formData.age, 10) > 125) {
      setError('Please enter a valid age between 1 and 125.')
      return false
    }
    setError(null)
    return true
  }

  const validateStep2 = () => {
    if (!formData.complaints.trim()) {
      setError('Please describe the primary complaints.')
      return false
    }
    if (!formData.timeline.trim()) {
      setError('Please state the duration or timeline of the complaints.')
      return false
    }
    setError(null)
    return true
  }

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setError(null)
    setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setError(null)
    setStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await registerPatientAndQueue(formData)
      if (result.success) {
        setSubmittedData(result)
        setStep(4) // Confirmation step
      } else {
        setError('Failed to submit form. Please try again.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('An error occurred during submission. Please check connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      age: '',
      gender: 'Male',
      abhaId: '',
      complaints: '',
      timeline: '',
      diet: 'Satmya & Shuddha (Balanced vegetarian)',
      sleep: 'Prakrutha (Sound sleep, 7-8 hours)',
      bowel: 'Madhyama (Normal regular digestion)'
    })
    setSubmittedData(null)
    setStep(1)
    setError(null)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner / Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ayur-700 bg-ayur-50 px-2.5 py-1 rounded-md border border-ayur-200">
              Pre-OPD Self Intake Kiosk
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Patient Registration & Triage
            </h1>
          </div>
          {step < 4 && (
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              Step {step} of 3
            </span>
          )}
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className={`h-2 rounded-full transition-colors ${step >= 1 ? 'bg-ayur-600' : 'bg-slate-200'}`} />
            <div className={`h-2 rounded-full transition-colors ${step >= 2 ? 'bg-ayur-600' : 'bg-slate-200'}`} />
            <div className={`h-2 rounded-full transition-colors ${step >= 3 ? 'bg-ayur-600' : 'bg-slate-200'}`} />
          </div>
        )}
      </div>

      {/* Error Message Box */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}

      {/* STEP 1: Demographics */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-ayur-600" />
              Step 1: Patient Information (वैयक्तिक विवरण)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please provide essential personal details and National Health ID (ABHA).
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Name (पूरा नाम) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Chandra Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            {/* Age & Gender Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Age (आयु in years) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 42"
                  min="1"
                  max="125"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Gender (लिंग) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Other'].map(g => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                      className={`py-2 text-sm font-medium rounded-xl border transition-all ${
                        formData.gender === g
                          ? 'bg-ayur-600 text-white border-ayur-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ABHA ID */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-semibold text-slate-700">
                  ABHA ID (Ayushman Bharat Health Account)
                </label>
                <span className="text-[11px] text-slate-400 font-medium">Optional</span>
              </div>
              <input
                type="text"
                name="abhaId"
                value={formData.abhaId}
                onChange={handleChange}
                placeholder="14-digit ABHA ID (e.g. 14-8892-3104-5501)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm font-mono transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Enables linked digital Ayurvedic case history under Ayush Digital Mission.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-700 hover:bg-ayur-800 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <span>Next: Presenting Complaints</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Presenting Complaints & Timeline */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-ayur-600" />
              Step 2: Presenting Complaints & Timeline (लक्षण एवं कालावधि)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Describe the main discomforts bringing you to the hospital today.
            </p>
          </div>

          <div className="space-y-4">
            {/* Quick Suggestions Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Common Ayurvedic Complaints (Click to add)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {commonComplaints.map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => handleQuickComplaint(item)}
                    className="text-xs py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-ayur-100 hover:text-ayur-900 text-slate-700 border border-slate-200 transition-colors"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Complaints Textarea */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Presenting Complaints (मुख्य लक्षण / वेदना) <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="complaints"
                rows="4"
                value={formData.complaints}
                onChange={handleChange}
                placeholder="Describe your symptoms in detail (e.g. Acid reflux after meals, burning in chest, joint stiffness in the morning...)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Timeline / Duration of Symptoms (कालावधि) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 3 days, 2 weeks, 6 months, intermittent for 1 year"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-700 hover:bg-ayur-800 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <span>Next: Ayurvedic Lifestyle</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Ayurvedic Lifestyle (Ahaar, Nidra, Koshtha) */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-ayur-700 bg-ayur-50 px-2 py-0.5 rounded border border-ayur-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trayopasthambha Pariksha</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Step 3: Ayurvedic Lifestyle (आहार, निद्रा, कोष्ठ)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ayurveda assesses three pillars of health for accurate Dosha profiling.
            </p>
          </div>

          <div className="space-y-5">
            {/* Ahaar (Diet) Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>1. Ahaar / Diet Habits (आहार प्रकार)</span>
              </label>
              <select
                name="diet"
                value={formData.diet}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
              >
                <option value="Satmya & Shuddha (Balanced vegetarian)">Satmya & Shuddha (Balanced vegetarian, regular meals)</option>
                <option value="Teekshna & Vidahi (Pungent, spicy, fermented, fried)">Teekshna & Vidahi (Pungent, spicy, fermented, deep fried)</option>
                <option value="Ruksha (Dry, packaged snacks, irregular water intake)">Ruksha (Dry, packaged snacks, irregular water intake)</option>
                <option value="Guru & Snigdha (Heavy, sweet, oily dairy-rich diet)">Guru & Snigdha (Heavy, sweet, oily dairy-rich diet)</option>
                <option value="Vishamashana (Irregular meal timings, skipping breakfast)">Vishamashana (Irregular meal timings, skipping breakfast)</option>
                <option value="Mishra (Mixed non-vegetarian & restaurant food)">Mishra (Mixed non-vegetarian & restaurant food)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Helps determine Agni (digestive fire) status: Sama, Vishama, Tikshna, or Manda.
              </p>
            </div>

            {/* Nidra (Sleep) Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>2. Nidra / Sleep Quality (निद्रा स्थिति)</span>
              </label>
              <select
                name="sleep"
                value={formData.sleep}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
              >
                <option value="Prakrutha (Sound sleep, 7-8 hours uninterrupted)">Prakrutha (Sound sleep, 7-8 hours uninterrupted)</option>
                <option value="Khandita (Disturbed sleep, frequent awakenings)">Khandita (Disturbed sleep, frequent awakenings)</option>
                <option value="Anidra (Difficulty falling asleep / Chronic Insomnia)">Anidra (Difficulty falling asleep / Chronic Insomnia)</option>
                <option value="Atinidra (Excessive sleep over 9 hours, lethargy on waking)">Atinidra (Excessive sleep over 9 hours, lethargy on waking)</option>
                <option value="Divaswapna (Habitual daytime sleeping / shift work)">Divaswapna (Habitual daytime sleeping / shift work)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Indicates Vata disturbance (Anidra/Khandita) or Kapha excess (Atinidra).
              </p>
            </div>

            {/* Koshtha (Bowel / Digestion) Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-600" />
                <span>3. Koshtha / Bowel Movement (कोष्ठ स्वभाव)</span>
              </label>
              <select
                name="bowel"
                value={formData.bowel}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-ayur-500 focus:border-transparent text-sm transition-all"
              >
                <option value="Madhyama (Moderate - once daily, formed, easy passage)">Madhyama (Moderate - once daily, formed, easy passage)</option>
                <option value="Krura (Hard - constipated, passed every 2-3 days with strain)">Krura (Hard - constipated, passed every 2-3 days with strain)</option>
                <option value="Mrudu (Soft - loose stools, passes 2-3 times daily easily)">Mrudu (Soft - loose stools, passes 2-3 times daily easily)</option>
                <option value="Vishamashana / Anila (Irregular - alternate hard and loose stools)">Vishamashana / Anila (Irregular - alternate hard and loose stools)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Crucial for selecting suitable Ayurvedic Aushadhi (e.g. Anulomana / Virechana).
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting & Queueing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit & Generate Token</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: CONFIRMATION SCREEN */}
      {step === 4 && submittedData && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg text-center space-y-6 animate-fade-in">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Added to Doctor's OPD Queue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Registration Successful!
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Your pre-OPD details have been entered and transmitted to the Ayurvedic Physician.
            </p>
          </div>

          {/* TOKEN CARD */}
          <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-slate-700">
            <div className="text-xs uppercase tracking-widest text-ayur-300 font-bold mb-1">
              Hospital OPD Token Number
            </div>
            <div className="text-5xl sm:text-6xl font-black tracking-tight text-white my-3 font-mono">
              {submittedData.tokenNumber}
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-center gap-4 pt-3 border-t border-slate-700/80">
              <div>
                <span className="text-slate-400">Status: </span>
                <span className="font-semibold text-emerald-400">Ready for Doctor</span>
              </div>
              <div>•</div>
              <div>
                <span className="text-slate-400">Est. Wait: </span>
                <span className="font-semibold text-white">~10-15 mins</span>
              </div>
            </div>
          </div>

          {/* Patient Details Summary Box */}
          <div className="max-w-md mx-auto text-left bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Patient Name:</span>
              <span className="font-bold text-slate-800">{submittedData.patient.full_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Age / Gender:</span>
              <span className="font-semibold text-slate-800">{submittedData.patient.age} yrs • {submittedData.patient.gender}</span>
            </div>
            {submittedData.patient.abha_id && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">ABHA ID:</span>
                <span className="font-mono text-slate-800">{submittedData.patient.abha_id}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Chief Complaint:</span>
              <span className="text-slate-800 font-medium truncate max-w-[220px]">{submittedData.patient.complaints}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Data Storage:</span>
              <span className="font-mono font-bold text-emerald-700 uppercase">{submittedData.source}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Token Slip</span>
            </button>

            <Link
              href="/doctor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ayur-700 hover:bg-ayur-800 text-white font-medium text-sm transition-all shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              <span>View in Doctor Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-medium text-sm"
            >
              <span>+ Register Next Patient</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
