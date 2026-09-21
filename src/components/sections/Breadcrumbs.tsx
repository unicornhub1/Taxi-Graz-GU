'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-[var(--color-cream)]">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[var(--color-gray-500)]">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-[var(--color-gold-dark)]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-[var(--color-black)]">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  )
}
