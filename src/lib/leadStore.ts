export interface QuizLead {
  name: string
  phone: string
  email: string
  timestamp: string
}

const STORAGE_KEY = 'polargroup-totem:quiz-leads'

export async function saveQuizLead(lead: QuizLead): Promise<void> {
  if (window.electronAPI?.saveQuizLead) {
    await window.electronAPI.saveQuizLead(lead)
    return
  }

  let leads: QuizLead[] = []
  try {
    leads = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as QuizLead[]
  } catch {
    leads = []
  }
  leads.push(lead)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}
