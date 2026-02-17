import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Taxi Graz GU – 24/7 Taxiservice in Graz & Umgebung'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0A0A0A',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Gold top bar */}
        <div style={{ display: 'flex', width: '100%', height: 6, backgroundColor: '#E8B931' }} />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: '60px 80px',
            gap: 32,
          }}
        >
          {/* Logo area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: 16,
                backgroundColor: '#E8B931',
                fontSize: 40,
                fontWeight: 700,
                color: '#0A0A0A',
              }}
            >
              T
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                TAXI
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 300,
                  color: '#E8B931',
                  letterSpacing: 8,
                  opacity: 0.7,
                }}
              >
                GRAZ & GU
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#FAFAF8',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            24/7 Taxiservice &bull; Flughafentransfer &bull; Stretchlimousinen
          </div>

          {/* Rating */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 8,
            }}
          >
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ fontSize: 24, color: '#E8B931' }}>
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#E8B931' }}>4.9</span>
            <span style={{ fontSize: 18, color: '#6E6E66' }}>(673 Bewertungen)</span>
          </div>

          {/* Phone */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
              backgroundColor: '#E8B931',
              color: '#0A0A0A',
              fontSize: 28,
              fontWeight: 700,
              padding: '16px 48px',
              borderRadius: 50,
            }}
          >
            ☎ +43 660 1083003
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px 0',
            fontSize: 14,
            color: '#4A4A44',
          }}
        >
          taxigraz-gu.at
        </div>
      </div>
    ),
    { ...size }
  )
}
