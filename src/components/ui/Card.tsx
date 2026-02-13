import { cn } from '@/lib/utils'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 transition-all duration-300',
        hover && 'hover:shadow-xl hover:shadow-[var(--color-gold)]/5 hover:border-[var(--color-gold)]/30 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}
