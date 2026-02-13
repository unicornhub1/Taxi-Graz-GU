'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded buttons */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ delay: 0.1 }}
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-center gap-3 rounded-full bg-[var(--color-gold)] px-5 py-3 font-semibold text-[var(--color-black)] shadow-xl shadow-[var(--color-gold)]/20 transition-transform hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  Anrufen
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-full bg-green-500 px-5 py-3 font-semibold text-white shadow-xl shadow-green-500/20 transition-transform hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </motion.a>
              </>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 cursor-pointer',
              isOpen
                ? 'bg-[var(--color-gray-800)] text-white rotate-0'
                : 'bg-[var(--color-gold)] text-[var(--color-black)] hover:bg-[var(--color-gold-dark)]'
            )}
            aria-label={isOpen ? 'Kontaktoptionen schließen' : 'Kontaktoptionen öffnen'}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Phone className="h-6 w-6" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
