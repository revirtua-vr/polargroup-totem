import { Card, CardTitle } from '@/components/ui/card'
import { BrandLogo } from '@/components/BrandLogo'
import { cn } from '@/lib/utils'

type BrandCardProps = {
  logo?: string | null
  name: string
  active?: boolean
  onClick?: () => void
  className?: string
  logoClassName?: string
  titleClassName?: string
  delay?: number
}

export function BrandCard({ logo, name, active, onClick, className, logoClassName, titleClassName, delay }: BrandCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer hud-corners transition-all active:scale-95 p-4 flex flex-col items-center text-center animate-page-in motion-reduce:animate-none',
        active
          ? 'hud-corners-visible border-brand-red/70 glow-red'
          : 'hover:glow-red hover:border-brand-red/60',
        className,
      )}
      style={delay !== undefined ? { animationDelay: `${delay}ms` } : undefined}
      onClick={onClick}
    >
      <BrandLogo
        src={logo ?? undefined}
        name={name}
        className={cn('w-full mb-2', logoClassName ?? 'h-20 sm:h-24')}
      />
      <CardTitle className={cn('line-clamp-2', titleClassName ?? 'text-sm sm:text-base')}>{name}</CardTitle>
    </Card>
  )
}
