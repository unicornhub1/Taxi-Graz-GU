'use client'

import Image from 'next/image'
import { Phone, MessageCircle, Mail, ArrowDown, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background image + dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-taxi.jpg"
          alt="Taxi in der Stadt"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay + top gradient for ContactBar/Header readability */}
        <div className="absolute inset-0 bg-[var(--color-gray-900)]/75" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />
        {/* Gold gradient orb */}
        <div className="absolute -right-[30%] top-[10%] h-[90vh] w-[90vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/15 via-[var(--color-gold)]/5 to-transparent blur-3xl" />
        <div className="absolute -left-[15%] bottom-[5%] h-[50vh] w-[50vh] rounded-full bg-[var(--color-gold)]/[0.04] blur-2xl" />
        {/* Subtle animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(232,185,49,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,185,49,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 pt-36 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Jetzt verfügbar
              </span>
              <span className="hidden sm:flex items-center gap-1 text-xs text-[var(--color-gray-500)]">
                <Star className="h-3 w-3 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                {SITE_CONFIG.google.rating} ({SITE_CONFIG.google.reviews} Bewertungen)
              </span>
            </motion.div>

            {/* Main headline - large editorial style */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-white">
                Ihr Taxi
                <br />
                in{' '}
                <span className="relative inline-block text-[var(--color-gold)]">
                  Graz
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C50 2 150 2 198 8" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </h1>
              <p className="mt-2 font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-gray-400)]">
                24/7 Taxiservice &amp; Flughafentransfer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--color-gray-400)]"
            >
              <strong className="text-white">Flughafentransfer</strong>,{' '}
              <strong className="text-white">Stretchlimousinen</strong> &amp;{' '}
              <strong className="text-white">zuverlässiger Taxiservice</strong> in Graz und Graz-Umgebung.
              Taxiunternehmen mit Festpreisen. Pünktlich, komfortabel und rund um die Uhr erreichbar.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[var(--color-gold)] px-8 py-4 text-lg font-bold text-[var(--color-black)] transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-gold)]/30 hover:scale-[1.03]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Phone className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Jetzt anrufen</span>
              </a>
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/20 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-green-400/50 hover:bg-green-500/10 hover:text-green-400"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Right side - Contact card + big phone number */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative z-20"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[var(--color-gold)]/20 via-transparent to-[var(--color-gold)]/5 blur-xl -z-10" />

              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                Sofort erreichbar
              </h2>

              {/* Big phone number */}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="mt-4 block text-3xl sm:text-4xl font-bold text-white transition-colors hover:text-[var(--color-gold)]"
              >
                {SITE_CONFIG.phone}
              </a>

              <div className="mt-8 space-y-3">
                {/* Phone */}
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]">
                    <Phone className="h-5 w-5 text-[var(--color-black)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Telefon</p>
                    <p className="text-xs text-[var(--color-gray-400)]">24/7 erreichbar</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">WhatsApp</p>
                    <p className="text-xs text-[var(--color-gray-400)]">Nachricht senden</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-700)]">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">E-Mail</p>
                    <p className="text-xs text-[var(--color-gray-400)]">{SITE_CONFIG.email}</p>
                  </div>
                </a>
              </div>

              {/* Trust badge */}
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-[var(--color-gold)]/10 px-4 py-3">
                <div className="flex -space-x-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[var(--color-gold)]">
                  {SITE_CONFIG.google.rating}
                </span>
                <span className="text-xs text-[var(--color-gray-400)]">
                  ({SITE_CONFIG.google.reviews} Google-Bewertungen)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
            Mehr erfahren
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce text-[var(--color-gold)]" />
        </motion.div>
      </div>
    </section>
  )
}
