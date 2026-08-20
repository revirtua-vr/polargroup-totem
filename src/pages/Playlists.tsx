import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { Play, SkipBack, SkipForward } from 'lucide-react'
import playlistsRaw from '@/data/playlists/pt-BR.json'

export type PlaylistVideo = {
  id: string
  title: string
  src: string
  thumbnail: string
}

export type Playlist = {
  id: string
  title: string
  videos: PlaylistVideo[]
}

const playlistsData = playlistsRaw as unknown as { playlists: Playlist[] }

export default function Playlists() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(playlistsData.playlists[0]?.id ?? '')
  const [currentIndex, setCurrentIndex] = useState(0)

  const playlist = playlistsData.playlists.find((p) => p.id === activeId) ?? playlistsData.playlists[0]
  const currentVideo = playlist?.videos[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeId])

  const playIndex = (index: number) => {
    if (!playlist) return
    const next = (index + playlist.videos.length) % playlist.videos.length
    setCurrentIndex(next)
  }

  if (!playlist || !currentVideo) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-xl text-muted-foreground">{t('playlists.empty')}</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <header className="text-center pt-6 pb-4 px-4 flex-shrink-0">
        <p className="micro-label mb-3">{t('nav.playlists')}</p>
        <h1 className="text-3xl font-bold">{t('playlists.title')}</h1>
        <p className="text-muted-foreground mt-2 text-xl">{t('playlists.subtitle')}</p>
        <SectionDivider className="mx-auto mt-4" />
      </header>

      <div className="flex-1 min-h-0 flex gap-6 px-6 pb-6 max-w-[1800px] w-full mx-auto">
        <main className="flex-1 min-h-0 flex flex-col gap-4">
          <div className="flex-1 min-h-0 hud-corners hud-corners-visible rounded-lg overflow-hidden bg-black/40">
            <video
              key={currentVideo.id}
              src={currentVideo.src}
              poster={currentVideo.thumbnail}
              controls
              autoPlay
              onEnded={() => playIndex(currentIndex + 1)}
              className="w-full h-full object-contain bg-black"
            />
          </div>

          <div className="flex items-center justify-between gap-4 flex-shrink-0">
            <p className="text-xl font-semibold truncate">{currentVideo.title}</p>
            <div className="flex gap-3 flex-shrink-0">
              <Button size="lg" variant="outline" onClick={() => playIndex(currentIndex - 1)}>
                <SkipBack className="w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => playIndex(currentIndex + 1)}>
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </main>

        <aside className="w-[420px] flex-shrink-0 flex flex-col min-h-0 gap-4">
          <div className="flex flex-wrap gap-2">
            {playlistsData.playlists.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`px-4 py-2 rounded-full text-base font-medium transition-colors border ${
                  p.id === playlist.id
                    ? 'bg-primary text-primary-foreground border-primary glow-red'
                    : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground'
                }`}
                onClick={() => setActiveId(p.id)}
              >
                {p.title}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-3 pr-2">
              {playlist.videos.map((video, i) => (
                <Card
                  key={video.id}
                  className={`cursor-pointer flex items-center gap-4 p-3 transition-all active:scale-[0.99] ${
                    i === currentIndex
                      ? 'border-brand-red/60 glow-red'
                      : 'hud-corners hover:border-brand-red/60 hover:glow-red'
                  }`}
                  onClick={() => playIndex(i)}
                >
                  <div className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {i === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Play className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium line-clamp-3">{video.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {i + 1} / {playlist.videos.length}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  )
}
