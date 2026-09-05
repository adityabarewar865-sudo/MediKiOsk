import './globals.css'
import Link from 'next/link'
import { Activity, Stethoscope, UserPlus, Database, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'AyurOPD - Ayurvedic Pre-OPD & Clinical Decision System',
  description: 'Integrated digital intake and Ashtavidha Pariksha clinical decision support system for Ayurvedic hospitals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-ayur-200 selection:text-ayur-900">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Title */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ayur-600 to-ayur-800 flex items-center justify-center text-white shadow-md shadow-ayur-600/20 group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg text-slate-900 tracking-tight">AyurOPD</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-ayur-100 text-ayur-800 border border-ayur-200">
                      Pre-OPD & OPD
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 hidden sm:block">Integrated Ayurvedic Clinical Workflow</p>
                </div>
              </Link>

              {/* Nav Links */}
              <nav className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/patient"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-ayur-700 hover:bg-ayur-50 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-ayur-600" />
                  <span className="hidden xs:inline">Patient Portal</span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">(/patient)</span>
                </Link>

                <Link
                  href="/doctor"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-ayur-700 hover:bg-ayur-800 shadow-sm rounded-lg transition-all hover:shadow"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctor Dashboard</span>
                  <span className="text-xs text-ayur-200 font-mono hidden md:inline">(/doctor)</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-sm text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-ayur-700 font-semibold font-serif">प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनं च ॥</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Next.js App Router</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Supabase / Local Queue</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
