import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', labelKey: 'quemSomos' },
  { path: '/marcas', labelKey: 'marcas' },
  { path: '/produtos', labelKey: 'produtos' },
  { path: '/videos', labelKey: 'videos' },
  { path: '/contato', labelKey: 'contato' },
] as const

export function NavBar() {
  const { t } = useTranslation()

  return (
    <nav className="flex items-center justify-center gap-1 px-4 py-2 border-b flex-shrink-0 bg-background">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )
          }
        >
          {t(`nav.${item.labelKey}`)}
        </NavLink>
      ))}
    </nav>
  )
}
