import { useTranslation } from 'react-i18next'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function QuemSomos() {
  const { t } = useTranslation()

  return (
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">{t('quemSomos.title')}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t('quemSomos.subtitle')}</p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>{t('quemSomos.paragraph1')}</p>
          <p>{t('quemSomos.paragraph2')}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('quemSomos.missionTitle')}</h2>
          <p>{t('quemSomos.missionText')}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('quemSomos.visionTitle')}</h2>
          <p>{t('quemSomos.visionText')}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('quemSomos.valuesTitle')}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {(t('quemSomos.values', { returnObjects: true }) as string[]).map((value, i) => (
              <li key={i}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}
