import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Provide a valid format fallback if env vars still contain placeholder text,
// preventing Next.js client initialization from throwing "Invalid URL" crash.
const isValidUrl = rawUrl && (rawUrl.startsWith('https://') || rawUrl.startsWith('http://')) && !rawUrl.includes('YOUR_SUPABASE_URL')
const safeUrl = isValidUrl ? rawUrl : 'https://example.supabase.co'
const safeKey = (rawKey && !rawKey.includes('YOUR_SUPABASE_ANON_KEY')) ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'

export const supabase = createClient(safeUrl, safeKey)

export const isSupabaseConfigured = Boolean(isValidUrl && rawKey && !rawKey.includes('YOUR_SUPABASE_ANON_KEY'))
