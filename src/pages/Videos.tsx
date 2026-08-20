import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { Play } from 'lucide-react'
import videosData from '@/data/videos/pt-BR.json'

export default function Videos() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string | null>(null)

  const video = videosData.videos.find((v) => v.id === selected)

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <p className="micro-label mb-3">{t('nav.videos')}</p>
          <h1 className="text-2xl font-bold">{t('videos.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('videos.subtitle')}</p>
          <SectionDivider className="mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8">
          {videosData.videos.map((v) => (
            <Card
              key={v.id}
              className="cursor-pointer hud-corners hover:glow-red hover:border-brand-red/60 transition-all active:scale-95 overflow-hidden"
              onClick={() => setSelected(v.id)}
            >
              <div className="relative h-48 bg-muted">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-primary/90 glow-red flex items-center justify-center">
                    <Play className="w-7 h-7 text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <CardTitle className="text-base">{v.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-none">
          {video && (
            <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
              <video
                src={video.src}
                controls
                autoPlay
                className="max-w-full max-h-[85vh]"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ScrollArea>
  )
}
