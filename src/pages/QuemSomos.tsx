import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 mb-4 flex items-center gap-3 text-2xl font-bold">
      <span aria-hidden className="h-3 w-3 flex-shrink-0 bg-brand-red" />
      {children}
    </h2>
  )
}

export default function QuemSomos() {
  const { t } = useTranslation()

  return (
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="micro-label mb-3">{t('nav.quemSomos')}</p>
          <img
            src="images/logo-polar-group.png"
            alt="Grupo Polar"
            className="h-24 sm:h-28 w-auto object-contain"
          />
          <h1 className="sr-only">{t('quemSomos.title')}</h1>
          <SectionDivider className="mt-4 mx-auto" />
        </div>

        <p className="text-xl text-muted-foreground mb-6">{t('quemSomos.subtitle')}</p>

        <div className="space-y-5">
          <p className="text-base leading-relaxed">{t('quemSomos.paragraph1')}</p>
          <p className="text-base leading-relaxed">{t('quemSomos.paragraph2')}</p>

          <SectionHeading>{t('quemSomos.missionTitle')}</SectionHeading>
          <p className="text-base leading-relaxed">{t('quemSomos.missionText')}</p>

          <SectionHeading>{t('quemSomos.visionTitle')}</SectionHeading>
          <p className="text-base leading-relaxed">{t('quemSomos.visionText')}</p>

          <SectionHeading>{t('quemSomos.valuesTitle')}</SectionHeading>
          <ul className="space-y-2">
            {(t('quemSomos.values', { returnObjects: true }) as string[]).map((value, i) => (
              <li key={i} className="flex items-start gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-red" />
                <span className="text-base leading-relaxed">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}
