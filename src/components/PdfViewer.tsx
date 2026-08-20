import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Document, Page, pdfjs } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { List } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const MAX_PAGE_WIDTH = 900
const MIN_ZOOM = 0.5
const MAX_ZOOM = 2
const ZOOM_STEP = 0.1

interface PdfViewerProps {
  file: string
  className?: string
  indexPage?: number
}

export function PdfViewer({ file, className, indexPage }: PdfViewerProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<Array<HTMLDivElement | null>>([])
  const [containerWidth, setContainerWidth] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      setContainerWidth(width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    pageRefs.current = []
  }, [file])

  const pageWidth = Math.max(320, Math.min(containerWidth - 64, MAX_PAGE_WIDTH)) * zoom

  function onLoadSuccess({ numPages: count }: PDFDocumentProxy) {
    setNumPages(count)
    setError(null)
  }

  function goToIndexPage() {
    const page = pageRefs.current[(indexPage ?? 1) - 1]
    if (page) {
      page.scrollIntoView()
    }
  }

  return (
    <div ref={containerRef} className={cn('flex flex-col', className)}>
      <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-dashed border-brand-gray-4 px-4 py-2">
        <p className="text-sm text-muted-foreground">
          {numPages > 0 ? `${numPages} páginas` : 'Carregando…'}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))}
            aria-label="Diminuir zoom"
          >
            −
          </Button>
          <span className="w-14 text-center text-sm tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))}
            aria-label="Aumentar zoom"
          >
            +
          </Button>
          {indexPage !== undefined && (
            <Button variant="outline" onClick={goToIndexPage}>
              <List className="w-4 h-4 mr-2" />
              {t('pdfViewer.index')}
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 bg-brand-gray-5/40">
        <div className="mx-auto flex max-w-fit flex-col items-center gap-4 py-6">
          {containerWidth > 0 && (
            <Document
              file={file}
              onLoadSuccess={onLoadSuccess}
              onLoadError={(loadError) => setError(loadError.message)}
              loading={<div className="p-8 text-muted-foreground">Carregando PDF…</div>}
              error={
                <div className="p-8 text-destructive">
                  {error ? `Erro: ${error}` : 'Falha ao carregar o PDF.'}
                </div>
              }
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  className="shadow-lg shadow-black/40"
                  inputRef={(el) => {
                    pageRefs.current[index] = el
                  }}
                />
              ))}
            </Document>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
