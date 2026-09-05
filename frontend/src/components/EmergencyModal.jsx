import React from 'react';
import { AlertTriangle, PhoneCall, X, ShieldAlert, Heart, Activity } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, onTriggerEmergencyIntake }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="max-w-lg w-full rounded-3xl border border-rose-500/50 bg-slate-900 light:bg-white p-6 shadow-2xl space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-rose-500">
              Immediate Emergency Protocol
            </span>
            <h3 className="text-xl font-black text-white light:text-slate-900">
              Emergency & Triage Support
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600">
          If you or the patient is experiencing severe difficulty breathing, crushing chest pain, unconsciousness, or heavy bleeding, bypass standard kiosk queue and contact emergency services immediately.
        </p>

        {/* Emergency Call Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:108"
            className="flex flex-col items-center p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-center transition-all shadow-lg shadow-rose-600/30"
          >
            <PhoneCall className="w-5 h-5 mb-1" />
            <span className="text-sm">Call 108</span>
            <span className="text-[10px] font-normal opacity-80">Govt Ambulance</span>
          </a>

          <a
            href="tel:112"
            className="flex flex-col items-center p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-center transition-all light:bg-slate-100 light:text-slate-900 light:border-slate-300"
          >
            <Activity className="w-5 h-5 mb-1 text-cyan-400" />
            <span className="text-sm">Call 112</span>
            <span className="text-[10px] font-normal opacity-80">Unified Emergency</span>
          </a>
        </div>

        {/* Quick first-aid tips */}
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-300 light:text-rose-800 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Chest Pain Suspected Infarction:</span>
          </div>
          <p className="text-[11px] text-slate-300 light:text-slate-700">
            Keep patient seated upright. Loosen tight clothing. Chew 300mg Soluble Aspirin if not allergic. Do not walk.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onTriggerEmergencyIntake) onTriggerEmergencyIntake();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-all"
          >
            Start Priority Emergency Intake
          </button>
        </div>

      </div>
    </div>
  );
}
