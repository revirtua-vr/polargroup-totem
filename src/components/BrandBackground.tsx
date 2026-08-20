import { useEffect, useRef } from 'react'

type Dot = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  glow: boolean
}

const GRAY_COLORS = ['#535558', '#8c8d8f', '#a9aaab']
const RED_COLORS = ['#ce1f2e', '#ed1c24']
const LINK_DISTANCE = 120

function buildDots(width: number, height: number): Dot[] {
  const count = Math.max(50, Math.min(170, Math.round((width * height) / 18000)))
  const dots: Dot[] = []
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    let color: string
    let glow = false
    if (roll < 0.12) {
      color = RED_COLORS[Math.floor(Math.random() * RED_COLORS.length)]
      glow = true
    } else if (roll < 0.16) {
      color = '#ffffff'
      glow = true
    } else {
      color = GRAY_COLORS[Math.floor(Math.random() * GRAY_COLORS.length)]
    }
    const speed = 0.04 + Math.random() * 0.1
    const angle = Math.random() * Math.PI * 2
    dots.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1.1 + Math.random() * 1,
      color,
      alpha: 0.35 + Math.random() * 0.35,
      glow,
    })
  }
  return dots
}

export function BrandBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dots: Dot[] = []
    let raf = 0
    let running = true

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = buildDots(width, height)
    }

    const step = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / LINK_DISTANCE
            const redPair = a.glow || b.glow
            ctx.strokeStyle = redPair
              ? `rgba(206, 31, 46, ${(t * 0.2).toFixed(3)})`
              : `rgba(169, 170, 171, ${(t * 0.15).toFixed(3)})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const dot of dots) {
        ctx.globalAlpha = dot.alpha
        ctx.fillStyle = dot.color
        if (dot.glow) {
          ctx.shadowColor = dot.color
          ctx.shadowBlur = 6
        }
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < -20) dot.x = width + 20
        if (dot.x > width + 20) dot.x = -20
        if (dot.y < -20) dot.y = height + 20
        if (dot.y > height + 20) dot.y = -20
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(step)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) {
        raf = requestAnimationFrame(step)
      } else {
        cancelAnimationFrame(raf)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-32 -left-32 w-[44rem] h-[44rem] rounded-full opacity-[0.14]"
        style={{
          background: 'radial-gradient(circle, #ce1f2e 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute -bottom-40 -right-32 w-[48rem] h-[48rem] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #1f295c 0%, transparent 65%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-75" />
    </div>
  )
}
