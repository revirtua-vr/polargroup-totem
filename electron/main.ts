import { app, BrowserWindow, ipcMain, screen } from 'electron'
import fs from 'fs'
import path from 'path'

let mainWindow: BrowserWindow | null = null

const isDev = !app.isPackaged

interface QuizLeadPayload {
  name?: unknown
  phone?: unknown
  email?: unknown
  timestamp?: unknown
}

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""').replace(/[\r\n]+/g, ' ')}"`
}

function registerLeadHandlers() {
  ipcMain.handle('quiz-lead:save', (_event, payload: QuizLeadPayload) => {
    const name = String(payload?.name ?? '').trim()
    const phone = String(payload?.phone ?? '').trim()
    const email = String(payload?.email ?? '').trim()
    const timestamp = String(payload?.timestamp ?? new Date().toISOString()).trim()

    if (!name) {
      throw new Error('quiz lead: name is required')
    }

    const file = path.join(app.getPath('userData'), 'leads.csv')
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, 'timestamp,name,phone,email\n', 'utf-8')
    }
    fs.appendFileSync(file, `${[timestamp, name, phone, email].map(escapeCsv).join(',')}\n`, 'utf-8')

    return { ok: true, file }
  })
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width,
    height,
    fullscreen: true,
    frame: false,
    autoHideMenuBar: true,
    kiosk: !isDev,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(process.resourcesPath, 'dist', 'index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  registerLeadHandlers()
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
