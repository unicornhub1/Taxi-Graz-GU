'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { useRouter, usePathname } from 'next/navigation'
import { Phone, Menu, X, MessageCircle, Mail, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import { navigation } from '@/data/navigation'
import { Container } from './Container'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()

  const handleMobileNav = useCallback((href: string) => {
    setIsMobileOpen(false)
    setTimeout(() => {
      if (href.startsWith('/#')) {
        const id = href.replace('/#', '')
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          router.push(href)
        }
      } else {
        router.push(href)
      }
    }, 350)
  }, [router])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <>
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'top-0 bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 py-3'
          : 'top-0 lg:top-[40px] bg-transparent py-5'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="block"
          >
            <Logo className="h-12 w-auto sm:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--color-gold)] after:transition-all after:duration-300 hover:after:w-full',
                  isScrolled
                    ? 'text-[var(--color-gray-600)] hover:text-[var(--color-black)]'
                    : 'text-white/70 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-black)] shadow-lg shadow-[var(--color-gold)]/20 transition-all duration-300 hover:bg-[var(--color-gold-dark)] hover:shadow-xl hover:shadow-[var(--color-gold)]/30"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
              <span className="sm:hidden">Anrufen</span>
            </a>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden transition-colors cursor-pointer',
                isScrolled
                  ? 'border-[var(--color-border)] text-[var(--color-black)] hover:bg-[var(--color-gray-100)]'
                  : 'border-white/20 text-white hover:bg-white/10'
              )}
              aria-label={isMobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

    </header>

    {/* Mobile Bottom Sheet - OUTSIDE header to avoid backdrop-filter containing block */}
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
            onClick={() => setIsMobileOpen(false)}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                setIsMobileOpen(false)
              }
            }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-[var(--color-gray-900)] lg:hidden touch-none"
          >
            <div className="sticky top-0 z-10 flex justify-center bg-[var(--color-gray-900)] pb-2 pt-4">
              <div className="h-1.5 w-12 rounded-full bg-white/20" />
            </div>

            <div className="px-6 pb-10 pt-2">
              <nav className="flex flex-col" aria-label="Mobile Navigation">
                {navigation.main.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <button
                      onClick={() => handleMobileNav(item.href)}
                      className="flex w-full items-center justify-between border-b border-white/[0.06] py-4 text-lg font-semibold text-white transition-colors active:text-[var(--color-gold)] cursor-pointer"
                    >
                      {item.label}
                      <span className="text-sm text-[var(--color-gold)]">&rarr;</span>
                    </button>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 space-y-3"
              >
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-center gap-4 rounded-2xl bg-[var(--color-gold)] p-4 transition-all active:scale-[0.98]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/10">
                    <Phone className="h-5 w-5 text-[var(--color-black)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-black)]">Jetzt anrufen</p>
                    <p className="text-xs font-medium text-[var(--color-black)]/70">{SITE_CONFIG.phone}</p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all active:scale-[0.98]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">WhatsApp</p>
                    <p className="text-xs text-white/50">Nachricht senden</p>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all active:scale-[0.98]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">E-Mail</p>
                    <p className="text-xs text-white/50">{SITE_CONFIG.email}</p>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3"
              >
                <div className="flex -space-x-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[var(--color-gold)]">{SITE_CONFIG.google.rating}</span>
                <span className="text-xs text-white/40">({SITE_CONFIG.google.reviews} Bewertungen)</span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}
