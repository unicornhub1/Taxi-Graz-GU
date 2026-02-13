import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'gold' | 'outline'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)]',
  gold: 'bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)] border border-[var(--color-gold)]/20',
  outline: 'border border-[var(--color-border)] text-[var(--color-gray-500)]',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
