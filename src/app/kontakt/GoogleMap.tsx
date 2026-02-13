'use client'

import { ConsentGate } from '@/components/ui/ConsentGate'

export function GoogleMap() {
  return (
    <ConsentGate
      fallbackTitle="Google Maps"
      fallbackDescription="Zum Anzeigen der Karte müssen Sie externe Cookies akzeptieren."
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.123456789!2d15.4743797!3d47.0500761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476e4b9e81400e39%3A0xbacb7e2f9c293087!2sTaxi%20Graz%20%2F%2FGU!5e0!3m2!1sde!2sat!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Taxi Graz GU Standort"
      />
    </ConsentGate>
  )
}
