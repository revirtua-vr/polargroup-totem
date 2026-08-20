import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  saveQuizLead: (lead: { name: string; phone: string; email: string; timestamp: string }) =>
    ipcRenderer.invoke('quiz-lead:save', lead),
})
