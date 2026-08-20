import type { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="h-full animate-page-in motion-reduce:animate-none">{children}</div>
}
