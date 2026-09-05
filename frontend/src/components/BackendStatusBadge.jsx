import React, { useState, useEffect } from 'react';
import { pingBackend, getApiBase } from '../services/api';
import { Server, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

export default function BackendStatusBadge() {
  const [status, setStatus] = useState({
    connected: false,
    checking: true,
    latencyMs: 0,
    version: '',
    service: ''
  });
  const [showModal, setShowModal] = useState(false);

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, checking: true }));
    const result = await pingBackend();
    if (result.connected) {
      setStatus({
        connected: true,
        checking: false,
        latencyMs: result.latencyMs,
        version: result.data.version || '1.0.0',
        service: result.data.service || 'FastAPI'
      });
    } else {
      setStatus({
        connected: false,
        checking: false,
        latencyMs: 0,
        version: '',
        service: 'Offline'
      });
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 12000);
    return () => clearInterval(interval);
  }, []);

  const apiBase = getApiBase() || window.location.origin;

  return (
    <>
      {/* Live Badge in Header */}
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
          status.connected
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 light:bg-emerald-50 light:text-emerald-800'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 light:bg-rose-50 light:text-rose-800'
        }`}
        title="Click to view Backend API connection details"
      >
        <span className={`w-2 h-2 rounded-full ${
          status.connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
        }`}></span>
        <Server className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Backend:</span>
        <span>{status.connected ? 'Connected' : 'Connecting...'}</span>
        {status.connected && (
          <span className="hidden md:inline text-[10px] text-emerald-500 font-mono opacity-80">
            {status.latencyMs}ms
          </span>
        )}
      </button>

      {/* Connection Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full rounded-3xl border border-slate-800 bg-slate-900 light:bg-white p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${status.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white light:text-slate-900">
                    Backend Connection Status
                  </h3>
                  <p className="text-xs text-slate-400">FastAPI Medical Engine</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                status.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {status.connected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 light:bg-slate-100">
                <span className="text-slate-400">API Host Address:</span>
                <span className="font-mono font-bold text-cyan-400">{apiBase}/api</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 light:bg-slate-100">
                <span className="text-slate-400">Response Latency:</span>
                <span className="font-mono text-emerald-400">{status.latencyMs} ms</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 light:bg-slate-100">
                <span className="text-slate-400">Clinical Knowledge Base:</span>
                <span className="text-slate-200 light:text-slate-800 font-semibold">Allopathy, Ayurveda, Homeopathy</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 light:bg-slate-100">
                <span className="text-slate-400">Supported Endpoints:</span>
                <span className="text-slate-200 light:text-slate-800 font-mono">/conditions, /solutions, /intake, /scan-rx, /tokens</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`${apiBase}/docs`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Open Swagger API Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={checkConnection}
                  disabled={status.checking}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${status.checking ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>Re-Ping</span>
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-white transition-all"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
