import { cn } from '@/lib/utils'

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('flex items-center gap-2 w-full max-w-xs', className)}>
      <svg height="2" className="flex-1 text-brand-gray-3" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 6"
        />
      </svg>
      <span className="h-2 w-2 rounded-full bg-brand-red flex-shrink-0" />
      <span className="h-1 w-6 bg-brand-gray-2 rounded-full flex-shrink-0" />
    </div>
  )
}

export function TargetRings({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('relative', className)}>
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full text-brand-gray-4 animate-spin-slow"
      >
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-brand-gray-4 animate-spin-slower">
        <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 6" />
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-brand-red/70">
        <circle cx="60" cy="60" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="14 8" />
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-brand-red/90">
        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
    </div>
  )
}
