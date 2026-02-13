'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui'
import { testimonials } from '@/data/testimonials'
import { SITE_CONFIG } from '@/lib/constants'

export function Testimonials() {
  return (
    <Section id="bewertungen" className="bg-white">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
        >
          Kundenstimmen
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          Das sagen unsere Kunden über{' '}
          <span className="text-[var(--color-gold-dark)]">Taxi Graz GU</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-[var(--color-gray-500)]"
        >
          Überzeugen Sie sich selbst: Über {SITE_CONFIG.google.reviews} zufriedene Kunden
          bewerten uns mit durchschnittlich {SITE_CONFIG.google.rating} Sternen auf Google.
        </motion.p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-5 w-5 fill-[var(--color-gold)] text-[var(--color-gold)]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mt-4 flex-1 text-[var(--color-gray-600)] leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                <div>
                  <p className="font-semibold text-[var(--color-black)]">{testimonial.name}</p>
                  <p className="text-xs text-[var(--color-gray-400)]">{testimonial.date}</p>
                </div>
                <div className="flex h-8 items-center gap-1 rounded-full bg-[var(--color-gray-50)] px-3">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-xs font-medium text-[var(--color-gray-500)]">Google</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Google link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <a
          href={SITE_CONFIG.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gray-500)] transition-colors hover:text-[var(--color-gold-dark)]"
        >
          Alle {SITE_CONFIG.google.reviews} Bewertungen auf Google ansehen
          <span>&rarr;</span>
        </a>
      </motion.div>
    </Section>
  )
}
