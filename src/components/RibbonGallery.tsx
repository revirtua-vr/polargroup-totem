import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'

export type GalleryItem = {
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  alt?: string
}

type RibbonGalleryProps = {
  items: GalleryItem[]
}

export function RibbonGallery({ items }: RibbonGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { t } = useTranslation()

  if (items.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{t('company.gallery')}</h3>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all focus:outline-none focus:border-primary motion-safe:hover:scale-105 motion-safe:active:scale-95"
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full bg-muted flex items-center justify-center">
                  <img
                    src={item.thumbnail ?? item.src}
                    alt={item.alt ?? ''}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-none">
          {selectedIndex !== null && items[selectedIndex] && (
            <div className="flex items-center justify-center w-full h-full min-h-[50vh] animate-in fade-in-0 zoom-in-95 duration-300 fill-mode-both motion-reduce:animate-none">
              {items[selectedIndex].type === 'video' ? (
                <video
                  src={items[selectedIndex].src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh]"
                />
              ) : (
                <img
                  src={items[selectedIndex].src}
                  alt={items[selectedIndex].alt ?? ''}
                  className="max-w-full max-h-[85vh] object-contain"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
