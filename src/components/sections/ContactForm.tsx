'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-black)]">
          Nachricht gesendet!
        </h3>
        <p className="max-w-sm text-[var(--color-gray-500)]">
          Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          className="mt-4"
        >
          Weitere Nachricht senden
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          label="Name"
          placeholder="Max Mustermann"
          required
        />
        <Input
          id="phone"
          label="Telefon"
          type="tel"
          placeholder="+43 660 ..."
          required
        />
      </div>
      <Input
        id="email"
        label="E-Mail"
        type="email"
        placeholder="ihre@email.at"
        required
      />
      <Input
        id="subject"
        label="Betreff"
        placeholder="z.B. Flughafentransfer anfragen"
      />
      <Textarea
        id="message"
        label="Nachricht"
        placeholder="Wie können wir Ihnen helfen?"
        rows={5}
        required
      />
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        Nachricht senden
      </Button>
    </form>
  )
}
