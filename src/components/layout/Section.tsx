import { cn } from '@/lib/utils'
import { Container } from './Container'

export interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  narrow?: boolean
  as?: 'section' | 'div' | 'article'
  id?: string
}

export function Section({
  children,
  className,
  containerClassName,
  narrow,
  as: Tag = 'section',
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cn('py-16 md:py-24', className)}>
      <Container className={containerClassName} narrow={narrow}>
        {children}
      </Container>
    </Tag>
  )
}
