'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))

  useEffect(() => {
    if (!ref.current || hasAnimated) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          animate(motionValue, value, { duration: 2, ease: 'easeOut' })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [motionValue, value, hasAnimated])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`
    })
    return unsubscribe
  }, [rounded, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const stats = [
  { value: 24, suffix: '/7', label: 'Erreichbar', sub: 'Tag & Nacht' },
  { value: 673, suffix: '+', label: 'Bewertungen', sub: '4.9★ auf Google' },
  { value: 15, suffix: '+', label: 'Jahre Erfahrung', sub: 'Seit 2010 in Graz' },
  { value: 10, suffix: ' Min', label: 'Vor Ort', sub: 'Durchschnittliche Ankunft' },
]

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-gray-900)]">
      {/* Background effects - matching Hero design language */}
      <div className="absolute inset-0 z-0">
        {/* Horizontal gold line borders */}
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
        <div className="absolute left-1/2 bottom-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
        {/* Gold gradient orbs (like Hero) */}
        <div className="absolute -left-[20%] top-[30%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/10 via-[var(--color-gold)]/3 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[20%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.05] blur-2xl" />
        {/* Subtle grid pattern (same as Hero) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(232,185,49,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,185,49,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Warum Taxi Graz GU
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Graz vertraut auf{' '}
            <span className="relative inline-block text-[var(--color-gold)]">
              uns
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" fill="none">
                <path d="M1 6C25 1 75 1 99 6" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col items-center py-8 md:py-10 ${
                  i < stats.length - 1 ? 'lg:border-r lg:border-white/[0.08]' : ''
                } ${i < 2 ? 'border-b border-white/[0.08] lg:border-b-0' : ''} ${
                  i % 2 === 0 && i < 2 ? 'border-r border-white/[0.08] lg:border-r-white/[0.08]' : ''
                } ${i === 1 ? 'border-r-0 lg:border-r lg:border-white/[0.08]' : ''}`}
              >
                <p className="font-[var(--font-display)] text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-gold)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-[var(--color-gray-500)]">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--color-gold)] px-8 py-4 text-base font-bold text-[var(--color-black)] transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-gold)]/25 hover:scale-[1.03]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <Phone className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Jetzt Taxi bestellen</span>
          </a>
          <span className="text-sm text-[var(--color-gray-500)]">
            oder{' '}
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              per WhatsApp schreiben
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
