import { supabase, isSupabaseConfigured } from './supabaseClient'

// In-memory / localStorage fallback storage key for offline/prototype demonstration
const LOCAL_QUEUE_KEY = 'ayur_opd_queue'
const LOCAL_PATIENT_KEY = 'ayur_opd_patients'
const LOCAL_CASE_SHEET_KEY = 'ayur_opd_case_sheets'

// Seed some initial patients if local storage is empty so the doctor dashboard has immediate data
export function getInitialDemoData() {
  return [
    {
      id: 'demo-p-1',
      full_name: 'Rajesh Sharma',
      age: 46,
      gender: 'Male',
      abha_id: '14-8892-3104-5501',
      complaints: 'Amlapitta (Hyperacidity) with retrosternal burning and sour eructations',
      timeline: '3 weeks, aggravated after oily & spicy food',
      diet: 'Teekshna & Vidahi (Pungent, Fermented)',
      sleep: 'Khandita (Disturbed, 5 hrs/night)',
      bowel: 'Krura (Irregular & constipated)',
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: 'demo-p-2',
      full_name: 'Sunita Patil',
      age: 58,
      gender: 'Female',
      abha_id: '91-4402-1198-7622',
      complaints: 'Janu Sandhigata Vata (Bilateral knee joint pain & crepitus during flexion)',
      timeline: '6 months, gradually worsening in cold weather',
      diet: 'Ruksha (Dry foods, low ghee intake)',
      sleep: 'Prakrutha (Normal 7 hrs)',
      bowel: 'Madhyama (Moderate)',
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: 'demo-p-3',
      full_name: 'Ananya Verma',
      age: 28,
      gender: 'Female',
      abha_id: '32-7719-0294-8843',
      complaints: 'Shirahshoola (Vata-Kaphaja migraine-type headache) and fatigue',
      timeline: '10 days, accompanied by eye strain',
      diet: 'Vishamashana (Irregular meal times, fast food)',
      sleep: 'Anidra (Insomnia, screen exposure till 2 AM)',
      bowel: 'Mrudu (Loose, 2-3 times/day)',
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  ]
}

function getLocalQueue() {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(LOCAL_QUEUE_KEY)
  if (!stored) {
    const demoPatients = getInitialDemoData()
    const initialQueue = demoPatients.map((p, idx) => ({
      id: `queue-${idx + 1}`,
      patient_id: p.id,
      token_number: `OPD-${101 + idx}`,
      status: 'Ready for Doctor',
      created_at: p.created_at,
      patient: p
    }))
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(initialQueue))
    localStorage.setItem(LOCAL_PATIENT_KEY, JSON.stringify(demoPatients))
    return initialQueue
  }
  try {
    return JSON.parse(stored)
  } catch (e) {
    return []
  }
}

function saveLocalQueue(queue) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(queue))
  }
}

function generateTokenNumber() {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const randomSuffix = Math.floor(100 + Math.random() * 900)
  return `OPD-${randomSuffix}`
}

/**
 * Inserts patient details and generates an OPD Queue entry
 */
export async function registerPatientAndQueue(formData) {
  const tokenNumber = generateTokenNumber()

  if (isSupabaseConfigured) {
    try {
      // 1. Insert into 'patients'
      const { data: patientRecord, error: patientError } = await supabase
        .from('patients')
        .insert([
          {
            full_name: formData.fullName,
            age: parseInt(formData.age, 10),
            gender: formData.gender,
            abha_id: formData.abhaId || null,
            complaints: formData.complaints,
            timeline: formData.timeline,
            diet: formData.diet,
            sleep: formData.sleep,
            bowel: formData.bowel
          }
        ])
        .select()
        .single()

      if (patientError) {
        console.warn('Supabase patients insert failed, using fallback:', patientError.message)
        throw patientError
      }

      // 2. Insert into 'opd_queue'
      const { data: queueRecord, error: queueError } = await supabase
        .from('opd_queue')
        .insert([
          {
            patient_id: patientRecord.id,
            token_number: tokenNumber,
            status: 'Ready for Doctor'
          }
        ])
        .select()
        .single()

      if (queueError) {
        console.warn('Supabase opd_queue insert failed:', queueError.message)
        throw queueError
      }

      return {
        success: true,
        source: 'supabase',
        tokenNumber,
        patient: patientRecord,
        queue: queueRecord
      }
    } catch (err) {
      console.warn('Falling back to local prototype storage:', err)
    }
  }

  // Fallback Local Storage Mode
  const newPatient = {
    id: `local-p-${Date.now()}`,
    full_name: formData.fullName,
    age: parseInt(formData.age, 10),
    gender: formData.gender,
    abha_id: formData.abhaId || '',
    complaints: formData.complaints,
    timeline: formData.timeline,
    diet: formData.diet,
    sleep: formData.sleep,
    bowel: formData.bowel,
    created_at: new Date().toISOString()
  }

  const newQueueItem = {
    id: `local-q-${Date.now()}`,
    patient_id: newPatient.id,
    token_number: tokenNumber,
    status: 'Ready for Doctor',
    created_at: new Date().toISOString(),
    patient: newPatient
  }

  const currentQueue = getLocalQueue()
  currentQueue.unshift(newQueueItem)
  saveLocalQueue(currentQueue)

  return {
    success: true,
    source: 'local_storage',
    tokenNumber,
    patient: newPatient,
    queue: newQueueItem
  }
}

/**
 * Fetch OPD Queue items filtered by status
 */
export async function getOpdQueue(status = 'Ready for Doctor') {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('opd_queue')
        .select(`
          id,
          patient_id,
          token_number,
          status,
          created_at,
          patient:patients (
            id,
            full_name,
            age,
            gender,
            abha_id,
            complaints,
            timeline,
            diet,
            sleep,
            bowel,
            created_at
          )
        `)
        .eq('status', status)
        .order('created_at', { ascending: true })

      if (!error && data) {
        return { data, source: 'supabase' }
      }
    } catch (err) {
      console.warn('Supabase getOpdQueue failed, falling back to local:', err)
    }
  }

  const localQueue = getLocalQueue()
  const filtered = localQueue.filter(item => item.status === status)
  return { data: filtered, source: 'local_storage' }
}

/**
 * Write to 'case_sheets' and update 'opd_queue' to 'Completed'
 */
export async function completeCaseSheet(data) {
  const { queueId, patientId, ashtavidhaPariksha, hpi, diagnosis, prescriptions, doctorNotes } = data

  if (isSupabaseConfigured) {
    try {
      // 1. Insert into case_sheets
      const { data: sheet, error: sheetErr } = await supabase
        .from('case_sheets')
        .insert([
          {
            patient_id: patientId,
            queue_id: queueId,
            ashtavidha_pariksha: ashtavidhaPariksha,
            hpi,
            diagnosis,
            prescriptions,
            doctor_notes: doctorNotes
          }
        ])
        .select()
        .single()

      if (sheetErr) throw sheetErr

      // 2. Update opd_queue status to 'Completed'
      const { error: updateErr } = await supabase
        .from('opd_queue')
        .update({ status: 'Completed' })
        .eq('id', queueId)

      if (updateErr) throw updateErr

      return { success: true, source: 'supabase', caseSheet: sheet }
    } catch (err) {
      console.warn('Supabase completeCaseSheet failed, using local fallback:', err)
    }
  }

  // Local fallback
  const currentQueue = getLocalQueue()
  const updatedQueue = currentQueue.map(item => {
    if (item.id === queueId) {
      return { ...item, status: 'Completed', completed_at: new Date().toISOString() }
    }
    return item
  })
  saveLocalQueue(updatedQueue)

  if (typeof window !== 'undefined') {
    const sheets = JSON.parse(localStorage.getItem(LOCAL_CASE_SHEET_KEY) || '[]')
    sheets.push({
      id: `case-${Date.now()}`,
      queue_id: queueId,
      patient_id: patientId,
      ashtavidha_pariksha: ashtavidhaPariksha,
      hpi,
      diagnosis,
      prescriptions,
      doctor_notes: doctorNotes,
      completed_at: new Date().toISOString()
    })
    localStorage.setItem(LOCAL_CASE_SHEET_KEY, JSON.stringify(sheets))
  }

  return { success: true, source: 'local_storage' }
}
