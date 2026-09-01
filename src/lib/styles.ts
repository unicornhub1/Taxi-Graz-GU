/** Ersetzt das bisherige rgba(232,185,49,0.3)-Raster – folgt der Akzentfarbe. */
const gridLine = 'color-mix(in srgb, var(--color-gold) 30%, transparent)'

export const goldGridStyle: React.CSSProperties = {
  backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
  backgroundSize: '80px 80px',
}
