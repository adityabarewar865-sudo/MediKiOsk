'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { isSupabaseConfigured } from '@/lib/supabaseClient'
import {
  UserPlus,
  Stethoscope,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Sparkles,
  HeartPulse,
  Flame,
  Moon,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react'

export default function HomePage() {
  const [supabaseActive, setSupabaseActive] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSupabaseActive(isSupabaseConfigured)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ayur-100 border border-ayur-200 text-ayur-800 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-ayur-600" />
          <span>Ayush Digital Health Mission Compatible (ABHA ID Ready)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Next-Gen <span className="text-ayur-700">Ayurvedic Pre-OPD</span> & Doctor Dashboard
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Streamlining patient intake with traditional <em>Trividha Pariksha</em> lifestyle profiling and empowering Vaidyas with interactive <em>Ashtavidha Pariksha</em> digital clinical decision workflows.
        </p>
      </div>

      {/* Supabase Status Banner */}
      <div className={`p-4 rounded-xl mb-10 border ${supabaseActive ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${supabaseActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {supabaseActive ? 'Supabase Connected & Active' : 'Running in Local Prototype & Storage Mode'}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {supabaseActive
                  ? 'Real-time sync to public.patients, public.opd_queue, and public.case_sheets is ready.'
                  : 'To link your live Supabase database, update .env.local with your project URL and Anon Key, and run supabase_schema.sql.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-sm">
              SQL Schema: <code className="text-ayur-800 font-mono">supabase_schema.sql</code>
            </span>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Card 1: Patient Portal */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-inner">
              <UserPlus className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Step 1: Patient Self-Checkin
              </span>
              <span className="text-xs font-mono text-slate-400">/patient</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Patient Pre-OPD Portal
            </h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Mobile-responsive 3-step intake form collecting demographic data, ABHA ID, chief complaints, timeline, and Ayurvedic lifestyle factors (Ahaar, Nidra, Koshtha) before generating an OPD token.
            </p>

            {/* Checklist */}
            <ul className="space-y-2.5 text-xs text-slate-600 mb-8 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Step 1:</strong> Demographics (Name, Age, Gender, ABHA ID)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Step 2:</strong> Presenting Complaints & Timeline</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Step 3:</strong> Ayurvedic Lifestyle (Ahaar, Nidra, Koshtha)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Queue Submission:</strong> Writes to Supabase & generates token</span>
              </li>
            </ul>
          </div>

          <Link
            href="/patient"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm hover:shadow"
          >
            <span>Open Patient Intake Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Doctor Dashboard */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-ayur-100 text-ayur-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-inner">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ayur-800 bg-ayur-50 px-2 py-0.5 rounded border border-ayur-200">
                Step 2: Clinical Console
              </span>
              <span className="text-xs font-mono text-slate-400">/doctor</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Doctor's Ashtavidha Dashboard
            </h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Dual-pane clinical examination dashboard with live OPD queue management, full patient pre-OPD summary, interactive Ashtavidha Pariksha examination cards, HPI, Diagnosis, and prescription builder.
            </p>

            {/* Checklist */}
            <ul className="space-y-2.5 text-xs text-slate-600 mb-8 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ayur-700 flex-shrink-0" />
                <span><strong>Left Panel:</strong> Real-time OPD Queue (Ready for Doctor)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ayur-700 flex-shrink-0" />
                <span><strong>Right Panel:</strong> Patient Details & Ashtavidha Pariksha</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ayur-700 flex-shrink-0" />
                <span><strong>Examination:</strong> Nadi, Jihva, Shabda, Sparsha, Drik, Mutra, Mala, Akriti</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ayur-700 flex-shrink-0" />
                <span><strong>Save & Complete:</strong> Writes to case_sheets & marks queue Completed</span>
              </li>
            </ul>
          </div>

          <Link
            href="/doctor"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-ayur-700 hover:bg-ayur-800 text-white font-medium text-sm transition-colors shadow-sm hover:shadow"
          >
            <span>Launch Doctor Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Ayurvedic Clinical Highlights Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-ayur-300 text-xs uppercase tracking-widest font-bold mb-3">
            <HeartPulse className="w-4 h-4" />
            <span>Classical Ayurvedic Diagnostics Digitized</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            The Ashtavidha Pariksha (अष्टविध परीक्षा) Framework
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Originating from Yogaratnakara, Ashtavidha Pariksha provides eight distinct clinical checkpoints for holistic clinical assessment of Rogi (patient) and Roga (illness).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">1. Nadi (Pulse)</p>
              <p className="text-xs text-slate-300 mt-1">Vata (Snake), Pitta (Frog), Kapha (Swan)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">2. Jihva (Tongue)</p>
              <p className="text-xs text-slate-300 mt-1">Sama (Coated), Nirama (Clean), Ruksha</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">3. Shabda (Voice)</p>
              <p className="text-xs text-slate-300 mt-1">Prakrutha, Gambhira, Ksheena</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">4. Sparsha (Touch)</p>
              <p className="text-xs text-slate-300 mt-1">Sheetala (Cold), Ushna (Warm), Ruksha</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">5. Drik (Eyes)</p>
              <p className="text-xs text-slate-300 mt-1">Peeta (Icteric), Rakta (Red), Prakrutha</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">6. Mutra (Urine)</p>
              <p className="text-xs text-slate-300 mt-1">Prakrutha, Peeta, Picchila, Alpa</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">7. Mala (Stool)</p>
              <p className="text-xs text-slate-300 mt-1">Baddha, Vibandha, Saama, Drava</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
              <p className="font-semibold text-sm text-emerald-300">8. Akriti (Build)</p>
              <p className="text-xs text-slate-300 mt-1">Sthula (Heavy), Krisha (Lean), Madhyama</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
