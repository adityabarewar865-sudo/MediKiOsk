'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getOpdQueue, completeCaseSheet } from '@/lib/opdService'
import { isSupabaseConfigured } from '@/lib/supabaseClient'
import {
  Stethoscope,
  Users,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Heart,
  Eye,
  Volume2,
  Hand,
  Droplets,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  Save,
  User,
  ArrowRight,
  ChevronRight,
  Pill,
  BookOpen,
  FileCheck
} from 'lucide-react'

export default function DoctorDashboard() {
  const [queue, setQueue] = useState([])
  const [completedQueue, setCompletedQueue] = useState([])
  const [activeTab, setActiveTab] = useState('ready') // 'ready' | 'completed'
  const [selectedPatientId, setSelectedPatientId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Ashtavidha Pariksha State
  const [ashtavidha, setAshtavidha] = useState({
    nadi: 'Vata (Sarpa Gati - rapid/curved)',
    jihva: 'Sama (White coated / Ama present)',
    shabda: 'Prakrutha (Clear & articulate)',
    sparsha: 'Prakrutha (Normal body temperature)',
    drik: 'Prakrutha (Clear sclera)',
    mutra: 'Prakrutha (Straw yellow, clear)',
    mala: 'Madhyama (Formed / regular)',
    akriti: 'Madhyama (Medium build)'
  })

  // Clinical Consultation State
  const [hpi, setHpi] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [dosha, setDosha] = useState('Pitta-Vata')
  const [doctorNotes, setDoctorNotes] = useState('')

  // Prescriptions State (Array of medicines)
  const [prescriptions, setPrescriptions] = useState([
    {
      medicine: 'Avipattikar Churna',
      form: 'Churna (Powder)',
      dosage: '3 grams twice daily',
      timing: 'Pragbhakta (Before food)',
      anupana: 'Warm water (Koshna Jala)'
    }
  ])

  // Fetch Queue Data
  const fetchQueueData = async () => {
    setLoading(true)
    try {
      const readyRes = await getOpdQueue('Ready for Doctor')
      const completedRes = await getOpdQueue('Completed')

      setQueue(readyRes.data || [])
      setCompletedQueue(completedRes.data || [])

      // Auto-select first ready patient if none selected
      if (readyRes.data && readyRes.data.length > 0 && !selectedPatientId) {
        setSelectedPatientId(readyRes.data[0].id)
      }
    } catch (err) {
      console.error('Error fetching queue:', err)
      setErrorMessage('Could not load OPD queue.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueueData()
  }, [])

  // Currently active selected queue item
  const currentList = activeTab === 'ready' ? queue : completedQueue
  const selectedQueueItem = currentList.find(item => item.id === selectedPatientId) || queue[0] || null

  // Whenever selected patient changes, populate smart defaults or reset consultation fields
  useEffect(() => {
    if (selectedQueueItem?.patient) {
      const p = selectedQueueItem.patient
      // Pre-fill HPI with presenting complaints as starting context
      setHpi(`Patient presents with ${p.complaints}. Duration: ${p.timeline}. Diet: ${p.diet}. Sleep: ${p.sleep}. Bowel habit: ${p.bowel}.`)
      
      // Smart initial diagnosis guess based on complaint keywords
      if (p.complaints.toLowerCase().includes('acidity') || p.complaints.toLowerCase().includes('amlapitta')) {
        setDiagnosis('Amlapitta (Urdhwaga) / Non-Ulcer Dyspepsia')
        setDosha('Pitta Predominant')
        setPrescriptions([
          { medicine: 'Avipattikar Churna', form: 'Churna', dosage: '3g twice daily', timing: 'Pragbhakta (Before food)', anupana: 'Koshna Jala (Warm water)' },
          { medicine: 'Kamadudha Rasa (Moti Yukta)', form: 'Vati (Tablet)', dosage: '250mg twice daily', timing: 'Adhobhakta (After food)', anupana: 'Water' }
        ])
        setAshtavidha(prev => ({ ...prev, nadi: 'Pitta (Manduka Gati - bounding)', jihva: 'Sama (Coated / Ama)', mutra: 'Peeta & Sadaha (Yellowish)' }))
      } else if (p.complaints.toLowerCase().includes('joint') || p.complaints.toLowerCase().includes('sandhi')) {
        setDiagnosis('Sandhigata Vata (Osteoarthritis / Degenerative Arthropathy)')
        setDosha('Vata Predominant')
        setPrescriptions([
          { medicine: 'Yogaraj Guggulu', form: 'Vati', dosage: '2 tablets twice daily', timing: 'Adhobhakta (After food)', anupana: 'Warm water' },
          { medicine: 'Mahanarayana Taila', form: 'Taila (External)', dosage: 'Local application twice daily', timing: 'External', anupana: 'N/A' }
        ])
        setAshtavidha(prev => ({ ...prev, nadi: 'Vata (Sarpa Gati - rapid/variable)', sparsha: 'Ruksha (Dry/Rough)', akriti: 'Madhyama' }))
      } else {
        setDiagnosis('Vata-Kaphaja Vikriti')
        setDosha('Vata-Kapha')
        setPrescriptions([
          { medicine: 'Triphala Churna', form: 'Churna', dosage: '5g at bedtime', timing: 'Nishi (At bedtime)', anupana: 'Warm water' }
        ])
      }
    }
  }, [selectedPatientId])

  // Prescription Handlers
  const addPrescriptionRow = () => {
    setPrescriptions(prev => [
      ...prev,
      { medicine: '', form: 'Vati (Tablet)', dosage: '1 tab twice daily', timing: 'After food', anupana: 'Warm water' }
    ])
  }

  const removePrescriptionRow = (index) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== index))
  }

  const updatePrescriptionRow = (index, field, value) => {
    setPrescriptions(prev => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  // Complete & Save Consultation
  const handleCompleteAndSave = async () => {
    if (!selectedQueueItem) return
    setSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const payload = {
        queueId: selectedQueueItem.id,
        patientId: selectedQueueItem.patient_id || selectedQueueItem.patient?.id,
        ashtavidhaPariksha: ashtavidha,
        hpi,
        diagnosis,
        prescriptions,
        doctorNotes
      }

      const res = await completeCaseSheet(payload)
      if (res.success) {
        setSuccessMessage(`Consultation completed for Token ${selectedQueueItem.token_number}! Record saved to case_sheets.`)
        // Refresh queue
        await fetchQueueData()
      } else {
        setErrorMessage('Failed to save case sheet.')
      }
    } catch (err) {
      console.error('Save error:', err)
      setErrorMessage('An error occurred while saving.')
    } finally {
      setSaving(false)
    }
  }

  // Filter queue by search term
  const filteredList = currentList.filter(item => {
    const q = searchTerm.toLowerCase()
    const name = item.patient?.full_name?.toLowerCase() || ''
    const token = item.token_number?.toLowerCase() || ''
    return name.includes(q) || token.includes(q)
  })

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2.5">
              <Stethoscope className="w-7 h-7 text-ayur-700" />
              <span>Doctor's OPD Clinical Console</span>
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-ayur-100 text-ayur-800 border border-ayur-200">
              Live OPD
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Integrated Ashtavidha Pariksha, History of Present Illness & Ayurvedic Formulation Management
          </p>
        </div>

        {/* Quick Stats & Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchQueueData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
            title="Refresh Queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-ayur-600' : ''}`} />
            <span>Refresh Queue</span>
          </button>

          <Link
            href="/patient"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Patient to Queue</span>
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-xs text-emerald-700 underline">Dismiss</button>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-xs text-rose-700 underline">Dismiss</button>
        </div>
      )}

      {/* DUAL PANE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT PANEL: REAL-TIME OPD QUEUE (lg:col-span-4)                           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[850px]">
          {/* Queue Header & Tabs */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-ayur-700" />
                <h2 className="font-bold text-sm text-slate-800">OPD Queue</h2>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {queue.length} Ready
              </span>
            </div>

            {/* Toggle Tabs: Ready vs. Completed */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/70 rounded-xl text-xs font-semibold mb-3">
              <button
                onClick={() => setActiveTab('ready')}
                className={`py-1.5 rounded-lg transition-all ${
                  activeTab === 'ready'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Waiting ({queue.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-1.5 rounded-lg transition-all ${
                  activeTab === 'completed'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completed ({completedQueue.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient name or token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-ayur-500"
              />
            </div>
          </div>

          {/* Queue Items List */}
          <div className="overflow-y-auto divide-y divide-slate-100 flex-1 p-2 space-y-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-ayur-600" />
                <span>Loading OPD queue...</span>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <p className="text-xs">No patients found in this queue.</p>
                {activeTab === 'ready' && (
                  <Link
                    href="/patient"
                    className="inline-block text-xs font-semibold text-ayur-700 hover:underline"
                  >
                    + Check-in new patient
                  </Link>
                )}
              </div>
            ) : (
              filteredList.map((item) => {
                const isSelected = selectedQueueItem?.id === item.id
                const p = item.patient || {}
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPatientId(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-ayur-50/80 border-ayur-600 shadow-sm ring-1 ring-ayur-600/30'
                        : 'bg-white hover:bg-slate-50 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-ayur-800 bg-ayur-100/80 px-2 py-0.5 rounded border border-ayur-200">
                        {item.token_number}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.status === 'Completed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-slate-900 truncate">
                      {p.full_name || 'Patient'}
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{p.age} yrs</span>
                      <span>•</span>
                      <span>{p.gender}</span>
                      {p.abha_id && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-[10px] text-slate-400 truncate max-w-[80px]">
                            {p.abha_id}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Complaint Snippet */}
                    {p.complaints && (
                      <p className="text-xs text-slate-600 line-clamp-1 mt-1.5 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                        "{p.complaints}"
                      </p>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANEL: CLINICAL CONSULTATION & ASHTAVIDHA PARIKSHA (lg:col-span-8)  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {selectedQueueItem && selectedQueueItem.patient ? (
            <>
              {/* 1. Patient Profile Header Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-ayur-100 text-ayur-800 flex items-center justify-center font-bold text-lg">
                      {selectedQueueItem.patient.full_name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">
                          {selectedQueueItem.patient.full_name}
                        </h2>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                          {selectedQueueItem.token_number}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                        <span>Age: <strong>{selectedQueueItem.patient.age} yrs</strong></span>
                        <span>•</span>
                        <span>Gender: <strong>{selectedQueueItem.patient.gender}</strong></span>
                        {selectedQueueItem.patient.abha_id && (
                          <>
                            <span>•</span>
                            <span>ABHA: <strong className="font-mono text-slate-700">{selectedQueueItem.patient.abha_id}</strong></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      selectedQueueItem.status === 'Completed'
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {selectedQueueItem.status}
                    </span>
                  </div>
                </div>

                {/* Pre-OPD Chief Complaints & Lifestyle Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-2">
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Presenting Complaints & Timeline
                    </span>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                      {selectedQueueItem.patient.complaints}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Duration: <span className="font-medium text-slate-700">{selectedQueueItem.patient.timeline}</span>
                    </p>
                  </div>

                  {/* Trividha Lifestyle Profile */}
                  <div className="bg-ayur-50/60 rounded-xl p-3.5 border border-ayur-200/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ayur-800 block mb-2">
                      Trayopasthambha (Pre-OPD Lifestyle Profile)
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Ahaar (Diet)</span>
                        <strong className="text-slate-800 line-clamp-1" title={selectedQueueItem.patient.diet}>
                          {selectedQueueItem.patient.diet?.split(' ')[0] || 'Satmya'}
                        </strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Nidra (Sleep)</span>
                        <strong className="text-slate-800 line-clamp-1" title={selectedQueueItem.patient.sleep}>
                          {selectedQueueItem.patient.sleep?.split(' ')[0] || 'Prakrutha'}
                        </strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Koshtha (Bowel)</span>
                        <strong className="text-slate-800 line-clamp-1" title={selectedQueueItem.patient.bowel}>
                          {selectedQueueItem.patient.bowel?.split(' ')[0] || 'Madhyama'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Interactive Ashtavidha Pariksha (अष्टविध परीक्षा) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-ayur-600" />
                    <h3 className="font-bold text-base text-slate-900">
                      Ashtavidha Pariksha (अष्टविध परीक्षा - Eightfold Examination)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Click to select findings</span>
                </div>

                {/* 8 Examination Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Nadi (Pulse) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-bold text-slate-800">1. Nadi (नाडी परीक्षा - Pulse)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Vata (Sarpa - rapid/variable)',
                        'Pitta (Manduka - bounding/jumping)',
                        'Kapha (Hamsa - slow/steady)',
                        'Vata-Pitta',
                        'Prakrutha (72/min)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, nadi: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.nadi === val
                              ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: Jihva (Tongue) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Hand className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-800">2. Jihva (जिह्वा परीक्षा - Tongue)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Nirama (Clean, pink, moist)',
                        'Sama (White coated / Ama)',
                        'Ruksha (Dry/fissured - Vata)',
                        'Rakta (Red/inflamed - Pitta)',
                        'Picchila (Slimy/coated)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, jihva: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.jihva === val
                              ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 3: Shabda (Voice/Speech) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-bold text-slate-800">3. Shabda (शब्द परीक्षा - Voice)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Prakrutha (Clear & articulate)',
                        'Gambhira (Deep/heavy)',
                        'Ksheena (Feeble/low energy)',
                        'Khara (Hoarse/dry)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, shabda: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.shabda === val
                              ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 4: Sparsha (Touch/Skin) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Hand className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-800">4. Sparsha (स्पर्श परीक्षा - Touch/Skin)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Prakrutha (Normal body temp)',
                        'Sheetala (Cold extremities)',
                        'Ushna (Warm/febrile)',
                        'Ruksha (Dry/rough)',
                        'Snigdha (Excessively oily/clammy)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, sparsha: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.sparsha === val
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 5: Drik (Eyes/Vision) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-sky-500" />
                      <span className="text-xs font-bold text-slate-800">5. Drik (दृक् परीक्षा - Eyes/Vision)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Prakrutha (Clear sclera)',
                        'Peeta (Yellow/Icteric - Pitta)',
                        'Rakta (Red/congested)',
                        'Shweta (Pale/anaemic)',
                        'Ruksha (Dry/sunken)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, drik: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.drik === val
                              ? 'bg-sky-50 border-sky-400 text-sky-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 6: Mutra (Urine) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-800">6. Mutra (मूत्र परीक्षा - Urine)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Prakrutha (Straw yellow, clear)',
                        'Peeta & Sadaha (Dark yellow, burning)',
                        'Picchila (Turbid/cloudy)',
                        'Alpa (Scanty)',
                        'Prabhuta (Excessive)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, mutra: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.mutra === val
                              ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 7: Mala (Stool/Elimination) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-herb-700" />
                      <span className="text-xs font-bold text-slate-800">7. Mala (मल परीक्षा - Stool)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Madhyama (Formed / regular)',
                        'Vibandha (Constipated/hard scybala)',
                        'Baddha/Drava (Loose/diarrhoea)',
                        'Saama (Mucus-laden, foul smelling)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, mala: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.mala === val
                              ? 'bg-herb-50 border-herb-400 text-herb-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card 8: Akriti (Body Constitution/Build) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-violet-500" />
                      <span className="text-xs font-bold text-slate-800">8. Akriti (आकृति परीक्षा - Body Build)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Madhyama (Medium/Athletic)',
                        'Sthula (Heavy / Medoroga)',
                        'Krisha (Lean / Karshya)'
                      ].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAshtavidha(prev => ({ ...prev, akriti: val }))}
                          className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all ${
                            ashtavidha.akriti === val
                              ? 'bg-violet-50 border-violet-400 text-violet-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Clinical Notes: HPI & Diagnosis */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-ayur-600" />
                  <span>Clinical Evaluation (HPI & Diagnosis)</span>
                </h3>

                {/* HPI */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    History of Present Illness (HPI / संप्राप्ति विवरण)
                  </label>
                  <textarea
                    rows="3"
                    value={hpi}
                    onChange={(e) => setHpi(e.target.value)}
                    placeholder="Enter detailed history, pathogenesis (samprapti), aggravating factors, and previous treatments..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-ayur-500 focus:outline-none"
                  />
                </div>

                {/* Diagnosis & Dosha Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Vyadhi Nidan (Diagnosis)
                    </label>
                    <input
                      type="text"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="e.g. Amlapitta / Non-Ulcer Dyspepsia"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-ayur-500 focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Dosha Involvement
                    </label>
                    <select
                      value={dosha}
                      onChange={(e) => setDosha(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-ayur-500 focus:outline-none"
                    >
                      <option value="Vata Predominant">Vata Predominant</option>
                      <option value="Pitta Predominant">Pitta Predominant</option>
                      <option value="Kapha Predominant">Kapha Predominant</option>
                      <option value="Vata-Pitta">Vata-Pitta</option>
                      <option value="Pitta-Kapha">Pitta-Kapha</option>
                      <option value="Vata-Kapha">Vata-Kapha</option>
                      <option value="Sannipata (Tridoshic)">Sannipata (Tridoshic)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Prescriptions (Aushadhi Yojana) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-ayur-600" />
                    <h3 className="font-bold text-base text-slate-900">
                      Prescription / Aushadhi Yojana (चिकित्सा पत्र)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={addPrescriptionRow}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-ayur-800 bg-ayur-50 hover:bg-ayur-100 border border-ayur-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                {/* Prescription Rows */}
                <div className="space-y-2.5">
                  {prescriptions.map((row, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={row.medicine}
                          onChange={(e) => updatePrescriptionRow(idx, 'medicine', e.target.value)}
                          placeholder="Medicine name (e.g. Avipattikar Churna, Yogaraj Guggulu)"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-ayur-500 bg-white"
                        />
                      </div>

                      <div className="w-full sm:w-28">
                        <select
                          value={row.form}
                          onChange={(e) => updatePrescriptionRow(idx, 'form', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-ayur-500"
                        >
                          <option value="Churna">Churna (Powder)</option>
                          <option value="Vati">Vati (Tablet)</option>
                          <option value="Kwatha">Kwatha (Decoction)</option>
                          <option value="Asava">Asava / Arishta</option>
                          <option value="Taila">Taila (Oil)</option>
                          <option value="Ghrita">Ghrita (Medicated Ghee)</option>
                          <option value="Avaleha">Avaleha (Paste)</option>
                        </select>
                      </div>

                      <div className="w-full sm:w-36">
                        <input
                          type="text"
                          value={row.dosage}
                          onChange={(e) => updatePrescriptionRow(idx, 'dosage', e.target.value)}
                          placeholder="Dosage (e.g. 3g twice daily)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-ayur-500 bg-white"
                        />
                      </div>

                      <div className="w-full sm:w-36">
                        <input
                          type="text"
                          value={row.timing}
                          onChange={(e) => updatePrescriptionRow(idx, 'timing', e.target.value)}
                          placeholder="Timing (Before / After food)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-ayur-500 bg-white"
                        />
                      </div>

                      <div className="w-full sm:w-36">
                        <input
                          type="text"
                          value={row.anupana}
                          onChange={(e) => updatePrescriptionRow(idx, 'anupana', e.target.value)}
                          placeholder="Anupana (Warm water, Honey)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-ayur-500 bg-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removePrescriptionRow(idx)}
                        disabled={prescriptions.length === 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-30 transition-colors"
                        title="Delete medicine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pathya-Apathya & Lifestyle Advice */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Pathya-Apathya & Advice (पथ्यापथ्य निर्देश)
                  </label>
                  <textarea
                    rows="2"
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    placeholder="Dietary dos and don'ts, lifestyle guidelines, follow-up after 14 days..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-ayur-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 5. Complete & Save Action Bar */}
              <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur rounded-2xl p-4 border border-slate-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    Writes to <strong>case_sheets</strong> table and marks queue status to <strong>Completed</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCompleteAndSave}
                    disabled={saving || selectedQueueItem.status === 'Completed'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-700 hover:bg-ayur-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving Case Sheet...</span>
                      </>
                    ) : selectedQueueItem.status === 'Completed' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Case Already Completed</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Complete & Save Case Sheet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Patient Selected</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select a waiting patient from the OPD Queue on the left panel to begin clinical evaluation and Ashtavidha Pariksha.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
