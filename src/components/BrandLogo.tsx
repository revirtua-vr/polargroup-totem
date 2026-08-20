import { useState } from 'react'
import { cn } from '@/lib/utils'

function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) {
    const letters = words[0].replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]/g, '')
    return (letters.slice(0, 3) || '?').toUpperCase()
  }
  return words
    .map((word) => word.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]/g, '').charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

type BrandLogoProps = {
  src?: string | null
  name: string
  className?: string
  imageClassName?: string
}

export function BrandLogo({ src, name, className, imageClassName }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg border border-dashed border-brand-gray-4 bg-brand-gray-5/60 text-brand-gray-1 select-none',
          className,
        )}
      >
        <span className="font-bold tracking-[0.2em]">{initialsOf(name)}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-lg border border-brand-gray-5 bg-white p-2',
        className,
      )}
    >
      <img
        src={src}
        alt={name}
        draggable={false}
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-contain', imageClassName)}
      />
    </div>
  )
}
