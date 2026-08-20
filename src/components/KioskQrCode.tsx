import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'

const KIOSK_WEB_BASE_URL = 'https://polar.revirtua.com'

export function KioskQrCode() {
  const { i18n, t } = useTranslation()
  const location = useLocation()

  const isKiosk = typeof window !== 'undefined' && !!window.electronAPI
  if (!isKiosk) return null

  const params = new URLSearchParams(location.search)
  if (!params.has('lng')) params.set('lng', i18n.language)
  const search = params.toString()
  const webUrl = `${KIOSK_WEB_BASE_URL}/#${location.pathname}${search ? `?${search}` : ''}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      <div className="hud-corners hud-corners-visible rounded-lg bg-white p-2.5 shadow-xl">
        <QRCodeSVG value={webUrl} size={112} bgColor="#ffffff" fgColor="#1a1c20" level="M" />
      </div>
      <span className="micro-label">{t('kioskQr.label')}</span>
    </div>
  )
}
