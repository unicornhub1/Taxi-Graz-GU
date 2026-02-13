import { Car } from 'lucide-react'
import { marqueeItems } from '@/data/marquee'

export function Marquee() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-gold)] py-4">
      {/* Gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--color-gold)] to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--color-gold)] to-transparent" />

      <div className="animate-marquee flex whitespace-nowrap">
        {/* Double the items for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <div key={i} className="mx-6 flex items-center gap-3 shrink-0">
            <Car className="h-4 w-4 text-[var(--color-black)]/40" />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-black)]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
