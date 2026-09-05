import React, { useState } from 'react';
import { 
  Pill, 
  Leaf, 
  Droplet, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Utensils, 
  Sparkles,
  Info
} from 'lucide-react';

export default function MultiPathyView({ 
  condition, 
  onStartIntake, 
  voiceEnabled 
}) {
  const [speaking, setSpeaking] = useState(false);
  const [activePathyTab, setActivePathyTab] = useState('all'); // 'all' | 'allopathy' | 'ayurveda' | 'homeopathy'

  if (!condition) {
    return (
      <div className="p-12 text-center text-slate-400">
        Please select a condition above to view multi-pathy remedies.
      </div>
    );
  }

  // Web Speech API for TTS Audio readout
  const speakSolutions = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const textToSpeak = `
      Medicines for ${condition.name}. 
      Allopathy first line: ${condition.allopathy?.medicines?.[0]?.name || ''}. 
      Ayurveda herbal: ${condition.ayurveda?.medicines?.[0]?.name || ''}. 
      Homeopathy remedy: ${condition.homeopathy?.medicines?.[0]?.name || ''}. 
      Please consult an OPD doctor if symptoms last more than two days.
    `;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      
      {/* Condition Header Bar */}
      <div className="p-5 sm:p-6 rounded-3xl border bg-slate-900/60 border-slate-800/80 light:bg-white light:border-slate-200 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {condition.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 light:bg-slate-100 light:text-slate-700">
                Severity: {condition.severity_level}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white light:text-slate-900 tracking-tight">
              {condition.name}
              <span className="ml-2.5 text-base sm:text-lg font-normal text-cyan-400 light:text-cyan-700">
                ({condition.hindi_name})
              </span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 light:text-slate-600">
              {condition.brief}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Listen Audio Button */}
            <button
              onClick={speakSolutions}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                speaking 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' 
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700 light:bg-slate-100 light:text-slate-800 light:border-slate-300'
              }`}
            >
              {speaking ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{speaking ? 'Stop Audio' : 'Audio Summary'}</span>
            </button>

            {/* Direct Intake Button */}
            <button
              onClick={() => onStartIntake(condition.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>Get OPD Token</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Red Flags / Emergency Warnings */}
        {condition.red_flags && condition.red_flags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 light:border-slate-200">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 light:text-rose-700 light:bg-rose-50">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider text-rose-400 light:text-rose-800 block">
                  Immediate Emergency Flags (Consult Hospital Immediately if present):
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {condition.red_flags.map((flag, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>{flag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Pathy Filter Tabs for Mobile / Quick Focus */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Compare Systems:
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-900/60 light:bg-slate-200/80 p-1 rounded-xl border border-slate-800 light:border-slate-300 text-xs">
          {[
            { id: 'all', label: 'All 3 Systems' },
            { id: 'allopathy', label: 'Allopathy 💊' },
            { id: 'ayurveda', label: 'Ayurveda 🌿' },
            { id: 'homeopathy', label: 'Homeopathy 💧' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePathyTab(tab.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                activePathyTab === tab.id
                  ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Comparative Solution Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* ================= ALLOPATHY CARD ================= */}
        {(activePathyTab === 'all' || activePathyTab === 'allopathy') && (
          <div className="flex flex-col rounded-3xl border bg-slate-900/50 border-cyan-500/30 light:bg-white light:border-cyan-200 shadow-xl overflow-hidden hover:border-cyan-500/60 transition-all">
            
            {/* Card Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/40 light:from-cyan-50 light:to-white border-b border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white light:text-slate-900">
                      Allopathy
                    </h2>
                    <p className="text-[11px] text-cyan-400 font-medium">Modern Medicine</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Fast Relief
                </span>
              </div>
            </div>

            {/* Medicines List */}
            <div className="p-4 sm:p-5 space-y-3.5 flex-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Frontline Medicines & Dosages</span>
              </div>

              <div className="space-y-2.5">
                {condition.allopathy?.medicines?.map((med, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 light:bg-slate-50 light:border-slate-200 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs sm:text-sm text-cyan-300 light:text-cyan-800">
                        {med.name}
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 light:bg-cyan-100 light:text-cyan-800 whitespace-nowrap">
                        {med.type.split(' ')[0]}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 light:text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{med.dose}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 light:text-slate-500 italic">
                      Purpose: {med.purpose}
                    </div>
                  </div>
                ))}
              </div>

              {/* Precautions */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Precautions
                </div>
                <ul className="space-y-1 text-xs text-slate-300 light:text-slate-600">
                  {condition.allopathy?.precautions?.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-3.5 bg-slate-950/60 light:bg-slate-100 border-t border-slate-800/80 light:border-slate-200 text-center">
              <span className="text-[11px] text-slate-400 light:text-slate-600 font-medium">
                {condition.allopathy?.doctor_visit}
              </span>
            </div>

          </div>
        )}

        {/* ================= AYURVEDA CARD ================= */}
        {(activePathyTab === 'all' || activePathyTab === 'ayurveda') && (
          <div className="flex flex-col rounded-3xl border bg-slate-900/50 border-emerald-500/30 light:bg-white light:border-emerald-200 shadow-xl overflow-hidden hover:border-emerald-500/60 transition-all">
            
            {/* Card Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/40 light:from-emerald-50 light:to-white border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white light:text-slate-900">
                      Ayurveda
                    </h2>
                    <p className="text-[11px] text-emerald-400 font-medium">Natural & Dosha Balance</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Root Cause
                </span>
              </div>
            </div>

            {/* Medicines List */}
            <div className="p-4 sm:p-5 space-y-3.5 flex-1">
              {/* Dosha Insight */}
              <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20 light:bg-emerald-50 text-xs text-emerald-300 light:text-emerald-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Dosha Target:</strong> {condition.ayurveda?.dosha}</span>
              </div>

              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Classical Formulations</span>
              </div>

              <div className="space-y-2.5">
                {condition.ayurveda?.medicines?.map((med, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 light:bg-slate-50 light:border-slate-200 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs sm:text-sm text-emerald-300 light:text-emerald-800">
                        {med.name}
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 light:bg-emerald-100 light:text-emerald-800 whitespace-nowrap">
                        {med.type.split(' ')[0]}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 light:text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{med.dose}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 light:text-slate-500 italic">
                      Action: {med.purpose}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ahara & Vihara (Diet/Lifestyle) */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ahara-Vihara (Diet & Habits)</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 light:text-slate-600">
                  {condition.ayurveda?.ahara_vihara?.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-3.5 bg-slate-950/60 light:bg-slate-100 border-t border-slate-800/80 light:border-slate-200 text-center">
              <span className="text-[11px] text-slate-400 light:text-slate-600 font-medium">
                Balances Agni & Tridosha without metabolic burden.
              </span>
            </div>

          </div>
        )}

        {/* ================= HOMEOPATHY CARD ================= */}
        {(activePathyTab === 'all' || activePathyTab === 'homeopathy') && (
          <div className="flex flex-col rounded-3xl border bg-slate-900/50 border-amber-500/30 light:bg-white light:border-amber-200 shadow-xl overflow-hidden hover:border-amber-500/60 transition-all">
            
            {/* Card Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-900/40 light:from-amber-50 light:to-white border-b border-amber-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white light:text-slate-900">
                      Homeopathy
                    </h2>
                    <p className="text-[11px] text-amber-400 font-medium">Constitutional Care</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Gentle & Safe
                </span>
              </div>
            </div>

            {/* Medicines List */}
            <div className="p-4 sm:p-5 space-y-3.5 flex-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Targeted Remedies</span>
              </div>

              <div className="space-y-2.5">
                {condition.homeopathy?.medicines?.map((med, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 light:bg-slate-50 light:border-slate-200 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs sm:text-sm text-amber-300 light:text-amber-800">
                        {med.name}
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 light:bg-amber-100 light:text-amber-800 whitespace-nowrap">
                        {med.potency}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 light:text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{med.dose}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 light:text-slate-500 italic">
                      Indication: {med.purpose}
                    </div>
                  </div>
                ))}
              </div>

              {/* Homeopathy Golden Rule */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>Golden Dosing Rule</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 light:bg-amber-50 text-xs text-amber-300 light:text-amber-800">
                  {condition.homeopathy?.rule}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-3.5 bg-slate-950/60 light:bg-slate-100 border-t border-slate-800/80 light:border-slate-200 text-center">
              <span className="text-[11px] text-slate-400 light:text-slate-600 font-medium">
                No chemical dependency or drug interaction.
              </span>
            </div>

          </div>
        )}

      </div>

      {/* Quick Summary Strip: When to Choose Which System */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 light:bg-slate-100 light:border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 light:text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0"></span>
            <span><strong>Allopathy:</strong> Rapid relief for acute fevers, severe infections, emergencies.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span><strong>Ayurveda:</strong> Natural root-cause healing, diet regulation, long-term immunity.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
            <span><strong>Homeopathy:</strong> Ultra-gentle constitutional balance, children/elderly friendly.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
