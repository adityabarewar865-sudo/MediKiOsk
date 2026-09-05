import React from 'react';
import { 
  Search, 
  Thermometer, 
  Wind, 
  Flame, 
  Activity, 
  Zap, 
  ShieldAlert, 
  Moon, 
  Droplet, 
  PieChart, 
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Thermometer,
  Wind,
  Flame,
  Activity,
  Zap,
  ShieldAlert,
  Moon,
  Droplet,
  PieChart,
  Heart
};

export default function ConditionSelector({ 
  conditions, 
  selectedId, 
  onSelectCondition, 
  searchQuery, 
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  return (
    <div className="space-y-4">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptom or illness (e.g. Fever, Acidity, Joint Pain, खांसी)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all outline-none border bg-slate-900/60 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 light:bg-white light:border-slate-300 light:text-slate-900 light:placeholder-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-semibold'
                  : 'bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 light:bg-slate-100 light:border-slate-200 light:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal / Grid Symptom Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
        {conditions.map((item) => {
          const IconComp = ICON_MAP[item.icon] || Sparkles;
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCondition(item.id)}
              className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/50 to-slate-900/90 border-cyan-500/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50 light:bg-cyan-50/80 light:border-cyan-400'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850 light:bg-white light:border-slate-200 light:hover:border-slate-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="bg-cyan-500 text-white transform rotate-45 translate-x-3 -translate-y-2 text-[9px] font-bold py-0.5 text-center w-12">
                    ✓
                  </div>
                </div>
              )}

              <div className={`p-2 rounded-xl mb-2 transition-colors ${
                isSelected
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700 light:bg-slate-100 light:text-cyan-600'
              }`}>
                <IconComp className="w-5 h-5" />
              </div>

              <div className="font-semibold text-xs sm:text-sm text-slate-100 light:text-slate-900 line-clamp-1">
                {item.name}
              </div>
              <div className="text-[11px] text-cyan-400/80 light:text-cyan-700 font-medium line-clamp-1">
                {item.hindi_name}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 w-full flex items-center justify-between text-[10px] text-slate-400 light:text-slate-500">
                <span className="truncate">{item.category.split('&')[0]}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-cyan-400' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
