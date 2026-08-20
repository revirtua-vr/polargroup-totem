import { useEffect } from 'react'

const INVISIBLE_INPUT_STYLE =
  'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;border:0;padding:0;margin:0;pointer-events:none;z-index:-1;'

export function OskBridge() {
  useEffect(() => {
    const isKiosk = typeof window !== 'undefined' && !!window.electronAPI
    const isTouch = typeof window !== 'undefined' && window.navigator.maxTouchPoints > 0
    if (!isKiosk || !isTouch) return

    const input = document.createElement('input')
    input.type = 'text'
    input.tabIndex = -1
    input.setAttribute('aria-hidden', 'true')
    input.setAttribute('autocapitalize', 'off')
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('style', INVISIBLE_INPUT_STYLE)
    document.body.appendChild(input)

    const keepAlive = (event: FocusEvent) => {
      if (event.relatedTarget === null) {
        input.focus()
      }
    }
    document.addEventListener('focusout', keepAlive)

    return () => {
      document.removeEventListener('focusout', keepAlive)
      input.remove()
    }
  }, [])

  return null
}
