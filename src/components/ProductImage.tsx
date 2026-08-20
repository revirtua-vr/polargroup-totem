import { useState } from 'react'
import { Package } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProductImageProps = {
  src?: string | null
  alt?: string
  className?: string
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        aria-hidden
        className={cn(
          'product-placeholder flex aspect-square w-full items-center justify-center',
          className,
        )}
      >
        <Package className="h-10 w-10 text-brand-gray-2" strokeWidth={1.25} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex aspect-square w-full items-center justify-center overflow-hidden bg-white/95 p-3',
        className,
      )}
    >
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  )
}
