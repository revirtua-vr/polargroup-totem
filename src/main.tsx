import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource/exo-2/latin-400.css'
import '@fontsource/exo-2/latin-500.css'
import '@fontsource/exo-2/latin-600.css'
import '@fontsource/exo-2/latin-700.css'
import App from './App'
import './i18n'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
