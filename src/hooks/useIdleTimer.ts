import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const IDLE_TIMEOUT = 180_000

export function useIdleTimer() {
  const navigate = useNavigate()
  const location = useLocation()
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        if (location.pathname !== '/') {
          navigate('/')
        }
      }, IDLE_TIMEOUT)
    }

    const events = ['mousedown', 'mousemove', 'touchstart', 'touchmove', 'click', 'keydown', 'scroll']

    events.forEach((event) => {
      document.addEventListener(event, resetTimer, { passive: true })
    })

    resetTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer)
      })
    }
  }, [navigate, location.pathname])
}
