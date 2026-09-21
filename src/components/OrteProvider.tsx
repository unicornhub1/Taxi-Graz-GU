'use client'

import { createContext, useContext } from 'react'
import type { OrtSummary } from '@/lib/ort'

const OrteContext = createContext<OrtSummary[]>([])

export function OrteProvider({ orte, children }: { orte: OrtSummary[]; children: React.ReactNode }) {
  return <OrteContext.Provider value={orte}>{children}</OrteContext.Provider>
}

/** Alle Ortsseiten (vom Root-Layout geladen) – für Footer & Co. */
export function useOrte(): OrtSummary[] {
  return useContext(OrteContext)
}
