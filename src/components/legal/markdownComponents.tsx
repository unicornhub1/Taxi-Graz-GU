import type { ReactNode } from 'react'

type WithChildren = { children?: ReactNode }

/** Bildet die bisherigen Tailwind-Klassen der Rechtsseiten auf Rich-Text-Knoten ab. */
export const legalComponents = {
  h2: (props?: WithChildren) => (
    <h2 className="mt-8 text-xl font-bold text-[var(--color-black)] first:mt-0">{props?.children}</h2>
  ),
  h3: (props?: WithChildren) => <h3 className="mt-4 font-semibold text-[var(--color-black)]">{props?.children}</h3>,
  p: (props?: WithChildren) => <p className="mt-3">{props?.children}</p>,
  ul: (props?: WithChildren) => <ul className="mt-3 list-disc pl-6 space-y-1">{props?.children}</ul>,
  ol: (props?: WithChildren) => <ol className="mt-3 list-decimal pl-6 space-y-1">{props?.children}</ol>,
  li: (props?: WithChildren) => <li>{props?.children}</li>,
  lic: (props?: WithChildren) => <>{props?.children}</>,
  bold: (props?: WithChildren) => <strong className="font-semibold text-[var(--color-black)]">{props?.children}</strong>,
  italic: (props?: WithChildren) => <em>{props?.children}</em>,
  break: () => <br />,
  a: (props?: { url?: string } & WithChildren) => {
    const external = props?.url?.startsWith('http')
    return (
      <a
        href={props?.url}
        className="text-[var(--color-gold-dark)] hover:underline"
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {props?.children}
      </a>
    )
  },
}
