import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded-md transition-colors',
            i18n.language === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent',
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
