'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { Container } from '@/components/layout/Container'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-gray-900)] py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[40%] h-[80vh] w-[80vh] rounded-full bg-[var(--color-gold)]/[0.04]" />
        <div className="absolute -right-[10%] -bottom-[30%] h-[50vh] w-[50vh] rounded-full bg-[var(--color-gold)]/[0.03]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]"
          >
            Jetzt Taxi bestellen
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Bereit loszufahren?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-[var(--color-gray-400)]"
          >
            Erreichen Sie uns jetzt – per Telefon, WhatsApp oder E-Mail. Wir sind 24/7 für Sie
            da.
          </motion.p>
        </div>

        {/* Contact grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3"
        >
          {/* Phone */}
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold)] transition-transform duration-300 group-hover:scale-110">
              <Phone className="h-6 w-6 text-[var(--color-black)]" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-gray-400)]">
              Anrufen
            </span>
            <span className="text-lg font-bold text-white">{SITE_CONFIG.phone}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={SITE_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 transition-transform duration-300 group-hover:scale-110">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-gray-400)]">
              WhatsApp
            </span>
            <span className="text-lg font-bold text-white">Nachricht senden</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gray-700)] transition-transform duration-300 group-hover:scale-110">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-gray-400)]">
              E-Mail
            </span>
            <span className="text-lg font-bold text-white">{SITE_CONFIG.email}</span>
          </a>
        </motion.div>

        {/* Link to contact page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)]"
          >
            Oder nutzen Sie unser Kontaktformular
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
