/// <reference types="vite/client" />

import type { QuizLead } from '@/lib/leadStore'

declare global {
  interface Window {
    electronAPI?: {
      platform: string
      saveQuizLead: (lead: QuizLead) => Promise<void>
    }
  }
}

export {}
