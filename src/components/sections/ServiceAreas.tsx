'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2, Trees } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { serviceAreas } from '@/data/serviceAreas'

const grazStadt = serviceAreas.filter((_, i) => i < 15)
const grazUmgebung = serviceAreas.filter((_, i) => i >= 15 && i < 25)
const spezial = serviceAreas.filter((_, i) => i >= 25)

function AreaGroup({
  title,
  icon: Icon,
  areas,
  delay,
}: {
  title: string
  icon: typeof Building2
  areas: typeof serviceAreas
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="mb-4 flex items-center justify-center gap-2">
        <Icon className="h-4 w-4 text-[var(--color-gold-dark)]" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
          {title}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {areas.map((area) => (
          <span
            key={area.keyword}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-600)] transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 hover:text-[var(--color-black)]"
          >
            <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)] transition-transform group-hover:scale-110" />
            {area.label}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function ServiceAreas() {
  return (
    <Section id="gebiete" className="bg-[var(--color-gray-50)]">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
        >
          Service-Gebiete
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          Taxi-Service in Graz und im gesamten Bezirk GU
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-[var(--color-gray-500)]"
        >
          Taxi Graz GU ist Ihr lokaler Partner für Taxifahrten in Graz und Umgebung. Wir sind
          in folgenden Gebieten für Sie unterwegs:
        </motion.p>
      </div>

      <div className="mt-12 space-y-10">
        <AreaGroup title="Graz Stadt" icon={Building2} areas={grazStadt} delay={0.3} />
        <AreaGroup title="Graz-Umgebung" icon={Trees} areas={grazUmgebung} delay={0.4} />
        <AreaGroup title="Spezial-Routen" icon={MapPin} areas={spezial} delay={0.5} />
      </div>
    </Section>
  )
}
