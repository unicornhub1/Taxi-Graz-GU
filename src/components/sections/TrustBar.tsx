'use client'

import { motion } from 'framer-motion'
import { Star, Clock, Shield, Accessibility } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const trustItems = [
  {
    icon: Clock,
    value: '24/7',
    label: 'Taxi-Service Graz',
  },
  {
    icon: Star,
    value: `${SITE_CONFIG.google.rating} ★`,
    label: `${SITE_CONFIG.google.reviews} Google Bewertungen`,
  },
  {
    icon: Shield,
    value: 'Seit 2010',
    label: 'Erfahrung & Vertrauen',
  },
  {
    icon: Accessibility,
    value: '100%',
    label: 'Barrierefrei',
  },
]

export function TrustBar() {
  return (
    <section className="relative border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[var(--color-border)] lg:grid-cols-4">
        {trustItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1 px-4 py-8 text-center md:py-10"
          >
            <span className="text-2xl font-bold tracking-tight text-[var(--color-black)] md:text-3xl">
              {item.value}
            </span>
            <span className="text-xs font-medium text-[var(--color-gray-400)] md:text-sm">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
