import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const

function FlagFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 18"
      aria-hidden="true"
      className="h-5 w-7 shrink-0 rounded-[3px] ring-1 ring-black/20"
    >
      {children}
    </svg>
  )
}

function BrazilFlag() {
  return (
    <FlagFrame>
      <rect width="24" height="18" fill="#009B3A" />
      <path d="M12 1.8 21.3 9 12 16.2 2.7 9Z" fill="#FEDF00" />
      <circle cx="12" cy="9" r="4.2" fill="#002776" />
      <path
        d="M8.2 8.3c1.1-.9 2.3-1.3 3.8-1.3s2.7.4 3.8 1.3c.3.9 0 1.7-.9 2.4-1.8-.8-4-.8-5.8 0-.9-.7-1.2-1.5-.9-2.4Z"
        fill="#FFF"
      />
    </FlagFrame>
  )
}

function UsaFlag() {
  return (
    <FlagFrame>
      <rect width="24" height="18" fill="#FFF" />
      <path
        fill="#B22234"
        d="M0 0h24v1.385H0zM0 2.769h24v1.385H0zM0 5.538h24v1.385H0zM0 8.308h24v1.385H0zM0 11.077h24v1.385H0zM0 13.846h24v1.385H0zM0 16.615h24v1.385H0z"
      />
      <rect width="10" height="9.692" fill="#3C3B6E" />
      <g fill="#FFF">
        <circle cx="2" cy="2.4" r="0.5" />
        <circle cx="5" cy="2.4" r="0.5" />
        <circle cx="8" cy="2.4" r="0.5" />
        <circle cx="2" cy="4.9" r="0.5" />
        <circle cx="5" cy="4.9" r="0.5" />
        <circle cx="8" cy="4.9" r="0.5" />
        <circle cx="2" cy="7.4" r="0.5" />
        <circle cx="5" cy="7.4" r="0.5" />
        <circle cx="8" cy="7.4" r="0.5" />
      </g>
    </FlagFrame>
  )
}

function SpainFlag() {
  return (
    <FlagFrame>
      <rect width="24" height="18" fill="#AA151B" />
      <rect y="4.5" width="24" height="9" fill="#F1BF00" />
    </FlagFrame>
  )
}

const flags: Record<(typeof languages)[number]['code'], ReactNode> = {
  'pt-BR': <BrazilFlag />,
  en: <UsaFlag />,
  es: <SpainFlag />,
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-1.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors min-h-[36px]',
            i18n.language === lang.code
              ? 'bg-primary text-primary-foreground glow-red'
              : 'bg-muted text-muted-foreground hover:bg-accent',
          )}
        >
          {flags[lang.code]}
          {lang.label}
        </button>
      ))}
    </div>
  )
}
