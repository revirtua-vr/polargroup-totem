import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PolarIntroColumn } from '@/components/PolarIntroColumn'
import { LogoMarquee } from '@/components/LogoMarquee'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ScrollArea className="h-full">
      <div className="min-h-full flex flex-col justify-center">
        <div className="w-full max-w-[1800px] mx-auto px-10 py-10 grid gap-16 xl:grid-cols-2 items-center">
          <PolarIntroColumn />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="flex items-center gap-3 text-3xl font-bold">
                <span aria-hidden className="h-4 w-4 flex-shrink-0 bg-brand-red" />
                {t('home.institutionalVideo')}
              </h2>
              <div className="hud-corners hud-corners-visible rounded-lg overflow-hidden bg-black/40">
                <video
                  src="videos/institucional/POLAR (Institucional Reduzido) FullHD (EN).mp4"
                  controls
                  autoPlay
                  playsInline
                  className="w-full aspect-video object-contain"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-3 flex items-center gap-3 text-3xl font-bold">
                <span aria-hidden className="h-4 w-4 flex-shrink-0 bg-brand-red" />
                {t('home.brandsTitle')}
              </h2>
              <p className="text-xl text-muted-foreground">{t('home.brandsSubtitle')}</p>
            </div>

            <LogoMarquee />

            <div className="flex justify-center">
              <Button
                size="lg"
                className="animate-cta-pulse motion-reduce:animate-none text-xl px-8 py-7"
                onClick={() => navigate('/marcas')}
              >
                {t('home.viewBrands')}
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
