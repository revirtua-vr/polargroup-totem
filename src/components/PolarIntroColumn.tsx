import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SectionDivider } from '@/components/BrandDecor'
import { Target, Eye, HeartHandshake, type LucideIcon } from 'lucide-react'

type PopupKey = 'mission' | 'vision' | 'values'

export function PolarIntroColumn() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<PopupKey | null>(null)

  const items: { key: PopupKey; icon: LucideIcon; title: string }[] = [
    { key: 'mission', icon: Target, title: t('quemSomos.missionTitle') },
    { key: 'vision', icon: Eye, title: t('quemSomos.visionTitle') },
    { key: 'values', icon: HeartHandshake, title: t('quemSomos.valuesTitle') },
  ]

  const dialogTitle = open ? items.find((item) => item.key === open)?.title : undefined

  return (
    <div className="flex flex-col items-start">
      <img
        src="images/logo-polar-group.png"
        alt="Polar Group"
        className="h-40 sm:h-48 w-auto object-contain"
      />
      <h1 className="sr-only">{t('quemSomos.title')}</h1>
      <SectionDivider className="mt-6" />

      <p className="text-2xl text-muted-foreground mt-8">{t('quemSomos.subtitle')}</p>

      <div className="space-y-5 mt-8">
        <p className="text-lg leading-relaxed">{t('quemSomos.paragraph1')}</p>
        <p className="text-lg leading-relaxed">{t('quemSomos.paragraph2')}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-10 w-full">
        {items.map(({ key, icon: Icon, title }) => (
          <button
            key={key}
            type="button"
            className="hud-corners hover:glow-red hover:border-brand-red/60 transition-all active:scale-95 border border-border bg-card rounded-lg flex flex-col items-center justify-center gap-4 px-3 py-8 min-h-[150px]"
            onClick={() => setOpen(key)}
          >
            <Icon aria-hidden className="w-12 h-12 text-brand-red" />
            <span className="text-xl font-semibold">{title}</span>
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(next) => !next && setOpen(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-3">
              <span aria-hidden className="h-3 w-3 flex-shrink-0 bg-brand-red" />
              {dialogTitle}
            </DialogTitle>
          </DialogHeader>
          {open === 'values' ? (
            <ul className="space-y-3">
              {(t('quemSomos.values', { returnObjects: true }) as string[]).map((value, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-red" />
                  <span className="text-base leading-relaxed">{value}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base leading-relaxed">
              {open === 'mission' ? t('quemSomos.missionText') : t('quemSomos.visionText')}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
