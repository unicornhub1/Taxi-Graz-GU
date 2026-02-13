'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItemProps {
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItemProps[]
  className?: string
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[var(--color-gold-dark)] cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-lg font-semibold text-[var(--color-gray-800)]">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-[var(--color-gold)] transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p className="text-[var(--color-gray-500)] leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('divide-y-0', className)}>
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}
