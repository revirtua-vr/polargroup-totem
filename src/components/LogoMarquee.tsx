import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'
import companiesData from '@/data/companies/pt-BR.json'

const AUTO_SPEED = 40
const CLICK_THRESHOLD = 8

export function LogoMarquee() {
  const navigate = useNavigate()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const halfWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const draggingRef = useRef(false)
  const hoverRef = useRef(false)
  const dragStartRef = useRef({ x: 0, offset: 0, moved: 0 })
  const suppressClickRef = useRef(false)
  const [offset, setOffset] = useState(0)

  const logos = [...companiesData.companies, ...companiesData.companies]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const updateHalf = () => {
      halfWidthRef.current = track.scrollWidth / 2
    }
    updateHalf()
    const observer = new ResizeObserver(updateHalf)
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf: number
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      const half = halfWidthRef.current
      if (!draggingRef.current && !hoverRef.current && half > 0) {
        const next = (offsetRef.current + AUTO_SPEED * dt) % half
        offsetRef.current = next
        setOffset(next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const wrapOffset = (value: number) => {
    const half = halfWidthRef.current
    if (half <= 0) return value
    return ((value % half) + half) % half
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    hoverRef.current = false
    dragStartRef.current = { x: event.clientX, offset: offsetRef.current, moved: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const dx = event.clientX - dragStartRef.current.x
    dragStartRef.current.moved = Math.max(dragStartRef.current.moved, Math.abs(dx))
    const next = wrapOffset(dragStartRef.current.offset - dx)
    offsetRef.current = next
    setOffset(next)
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    if (event.pointerType !== 'mouse') {
      hoverRef.current = false
    }
    suppressClickRef.current = dragStartRef.current.moved > CLICK_THRESHOLD
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  const handleChipClick = (id: string) => {
    if (suppressClickRef.current) return
    navigate(`/marcas/${id}`)
  }

  return (
    <div
      className="logo-marquee overflow-hidden w-full py-4 cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => {
        hoverRef.current = true
      }}
      onMouseLeave={() => {
        hoverRef.current = false
      }}
    >
      <div
        ref={trackRef}
        className="logo-marquee-track flex gap-6 w-max will-change-transform"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {logos.map((company, i) => (
          <button
            key={`${company.id}-${i}`}
            type="button"
            className="flex-shrink-0 cursor-pointer transition-transform active:scale-95 touch-none"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            onClick={() => handleChipClick(company.id)}
            aria-label={company.name}
          >
            <BrandLogo src={company.logo} name={company.name} className="w-56 h-28" />
          </button>
        ))}
      </div>
    </div>
  )
}
