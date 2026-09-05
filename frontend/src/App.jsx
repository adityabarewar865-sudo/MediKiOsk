import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ConditionSelector from './components/ConditionSelector';
import MultiPathyView from './components/MultiPathyView';
import KioskIntakeModal from './components/KioskIntakeModal';
import PrescriptionScanner from './components/PrescriptionScanner';
import DoctorSummaryView from './components/DoctorSummaryView';
import EmergencyModal from './components/EmergencyModal';
import { 
  Activity, 
  Clock, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  UserCheck, 
  FileText, 
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import { 
  fetchConditionsAPI, 
  fetchConditionDetailAPI, 
  fetchTokensAPI, 
  fetchStatsAPI 
} from './services/api';

function MediKioskApp() {
  const [activeTab, setActiveTab] = useState('solutions'); // 'solutions' | 'kiosk' | 'scanner' | 'doctor'
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  // Data states
  const [conditions, setConditions] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedConditionId, setSelectedConditionId] = useState('fever-cold');
  const [selectedConditionDetail, setSelectedConditionDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadingCondition, setLoadingCondition] = useState(false);

  // Doctor OPD Queue
  const [tokens, setTokens] = useState([]);
  const [stats, setStats] = useState({
    patients_processed_today: 188,
    avg_intake_time_mins: 1.7,
    doctor_time_saved_per_patient_mins: 4.5
  });

  // Fetch all conditions list on mount
  useEffect(() => {
    fetchConditions();
    fetchTokens();
    fetchStats();
  }, []);

  // Fetch condition details whenever selectedConditionId changes
  useEffect(() => {
    if (selectedConditionId) {
      fetchConditionDetails(selectedConditionId);
    }
  }, [selectedConditionId]);

  const fetchConditions = async (query = '', cat = '') => {
    try {
      const data = await fetchConditionsAPI(query, cat);
      setConditions(data.conditions);
      setCategories(data.categories);
      if (!selectedConditionId && data.conditions.length > 0) {
        setSelectedConditionId(data.conditions[0].id);
      }
    } catch (err) {
      console.error('Error fetching conditions from backend:', err);
    }
  };

  const fetchConditionDetails = async (id) => {
    setLoadingCondition(true);
    try {
      const data = await fetchConditionDetailAPI(id);
      setSelectedConditionDetail(data);
    } catch (err) {
      console.error('Error fetching condition details from backend:', err);
    } finally {
      setLoadingCondition(false);
    }
  };

  const fetchTokens = async () => {
    try {
      const data = await fetchTokensAPI();
      setTokens(data.tokens);
    } catch (err) {
      console.error('Error fetching tokens from backend:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await fetchStatsAPI();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats from backend:', err);
    }
  };

  // Trigger search when query or category changes
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchConditions(searchQuery, selectedCategory);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory]);

  const handleStartIntake = (conditionId) => {
    setSelectedConditionId(conditionId);
    setActiveTab('kiosk');
  };

  const handleTokenGenerated = (newSession) => {
    fetchTokens();
    fetchStats();
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        voiceEnabled={voiceEnabled} 
        setVoiceEnabled={setVoiceEnabled} 
        onOpenSOS={() => setIsSOSOpen(true)}
        stats={stats}
      />

      {/* Live Hospital OPD Stats Ribbon */}
      <div className="border-b border-slate-800/60 dark:border-slate-800/60 light:border-slate-200/80 bg-slate-900/30 dark:bg-slate-900/30 light:bg-slate-100/60 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-300 light:text-slate-700">
                Hospital OPD Status: <span className="text-cyan-400 font-bold">Online & Active</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 light:text-slate-600">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Triaged Today: <strong className="text-slate-200 light:text-slate-900">{stats.patients_processed_today}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Avg Intake: <strong className="text-slate-200 light:text-slate-900">{stats.avg_intake_time_mins} mins</strong></span>
              </div>
              <div className="flex items-center gap-1.5 hidden sm:flex">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                <span>Saved per Doctor: <strong className="text-slate-200 light:text-slate-900">{stats.doctor_time_saved_per_patient_mins} mins</strong></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* ================= TAB 1: MEDICINES & SOLUTIONS (MULTI-PATHY) ================= */}
        {activeTab === 'solutions' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Quick Intro Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 light:from-white light:to-cyan-50 light:border-slate-200 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Triple-Modality Healthcare Navigator
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white light:text-slate-900">
                  Select Ailment for Instant Comparative Solutions
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 mt-1 max-w-2xl">
                  Get clear, actionable medicines and dietary remedies across <strong>Allopathy</strong>, <strong>Ayurveda</strong>, and <strong>Homeopathy</strong> without reading through walls of text.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('kiosk')}
                className="self-start md:self-center px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 active:scale-95 transition-all whitespace-nowrap"
              >
                Self-Service Kiosk Intake →
              </button>
            </div>

            {/* Step 1: Condition / Symptom Picker */}
            <ConditionSelector 
              conditions={conditions}
              selectedId={selectedConditionId}
              onSelectCondition={(id) => setSelectedConditionId(id)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            {/* Step 2: Multi-Pathy Solutions View */}
            {loadingCondition ? (
              <div className="p-16 text-center text-slate-400 space-y-2">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs">Loading cross-pathy formulations...</p>
              </div>
            ) : (
              <MultiPathyView 
                condition={selectedConditionDetail}
                onStartIntake={handleStartIntake}
                voiceEnabled={voiceEnabled}
              />
            )}

          </div>
        )}

        {/* ================= TAB 2: PATIENT KIOSK CHECK-IN ================= */}
        {activeTab === 'kiosk' && (
          <div className="animate-fade-in space-y-4">
            <KioskIntakeModal 
              conditions={conditions}
              preselectedConditionId={selectedConditionId}
              onClose={() => setActiveTab('solutions')}
              onTokenGenerated={handleTokenGenerated}
              voiceEnabled={voiceEnabled}
            />
          </div>
        )}

        {/* ================= TAB 3: PRESCRIPTION & LAB SCANNER ================= */}
        {activeTab === 'scanner' && (
          <div className="animate-fade-in space-y-4">
            <PrescriptionScanner />
          </div>
        )}

        {/* ================= TAB 4: DOCTOR OPD QUEUE & DESK ================= */}
        {activeTab === 'doctor' && (
          <div className="animate-fade-in space-y-4">
            <DoctorSummaryView 
              tokens={tokens}
              onRefreshTokens={fetchTokens}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 mt-12 py-6 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 light:text-slate-600">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300 light:text-slate-800">MediKiosk Platform</span>
            <span>• Hackathon 2026 Prototype</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ABDM / ABHA Standards</span>
            <span>•</span>
            <span>AYUSH Integrative Protocol</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </footer>

      {/* Emergency Modal */}
      <EmergencyModal 
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        onTriggerEmergencyIntake={() => {
          setIsSOSOpen(false);
          setActiveTab('kiosk');
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MediKioskApp />
    </ThemeProvider>
  );
}
