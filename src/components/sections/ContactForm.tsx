'use client'

import { useState, useRef } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const form = formRef.current!
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten.')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      )
    } finally {
      setIsLoading(false)
    }
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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Name"
          placeholder="Max Mustermann"
          required
          disabled={isLoading}
        />
        <Input
          id="phone"
          name="phone"
          label="Telefon"
          type="tel"
          placeholder="+43 660 ..."
          required
          disabled={isLoading}
        />
      </div>
      <Input
        id="email"
        name="email"
        label="E-Mail"
        type="email"
        placeholder="ihre@email.at"
        required
        disabled={isLoading}
      />
      <Input
        id="subject"
        name="subject"
        label="Betreff"
        placeholder="z.B. Flughafentransfer anfragen"
        disabled={isLoading}
      />
      <Textarea
        id="message"
        name="message"
        label="Nachricht"
        placeholder="Wie können wir Ihnen helfen?"
        rows={5}
        required
        disabled={isLoading}
      />
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Wird gesendet...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Nachricht senden
          </>
        )}
      </Button>
    </form>
  )
}
