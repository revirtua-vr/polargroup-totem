import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', labelKey: 'quemSomos' },
  { path: '/marcas', labelKey: 'marcas' },
  { path: '/produtos', labelKey: 'produtos' },
  { path: '/videos', labelKey: 'videos' },
  { path: '/contato', labelKey: 'contato' },
  { path: '/quiz', labelKey: 'quiz' },
] as const

export function NavBar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const activeRef = useRef<HTMLAnchorElement | null>(null)
  const [indicator, setIndicator] = useState<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)

  useLayoutEffect(() => {
    const update = () => {
      if (!activeRef.current) return
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeRef.current
      setIndicator({ left: offsetLeft, top: offsetTop, width: offsetWidth, height: offsetHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [pathname, t])

  return (
    <nav className="relative flex items-center justify-center gap-1 px-4 py-2 border-b border-dashed border-brand-gray-4 flex-shrink-0 bg-background/80 backdrop-blur">
      {indicator && (
        <span
          aria-hidden
          className="absolute rounded-md bg-primary glow-red transition-all duration-300 ease-out motion-reduce:transition-none"
          style={{
            left: indicator.left,
            top: indicator.top,
            width: indicator.width,
            height: indicator.height,
          }}
        />
      )}
      {navItems.map((item) => {
        const isActive =
          item.path === '/'
            ? pathname === '/'
            : pathname === item.path || pathname.startsWith(`${item.path}/`)
        return (
          <Link
            key={item.path}
            to={item.path}
            ref={isActive ? activeRef : undefined}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center',
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {t(`nav.${item.labelKey}`)}
          </Link>
        )
      })}
    </nav>
  )
}
