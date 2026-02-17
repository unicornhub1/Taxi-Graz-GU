import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject?: string
  message: string
}

function validate(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Bitte geben Sie Ihren Namen ein.'
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  }
  if (!data.phone || data.phone.trim().length < 5) {
    return 'Bitte geben Sie Ihre Telefonnummer ein.'
  }
  if (!data.message || data.message.trim().length < 5) {
    return 'Bitte geben Sie eine Nachricht ein.'
  }
  return null
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()

    const error = validate(data)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const port = Number(process.env.SMTP_PORT) || 465
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const contactEmail = process.env.CONTACT_EMAIL || 'info@taxigraz-gu.at'
    const fromAddress = process.env.SMTP_USER || 'info@taxigraz-gu.at'

    // Mail 1: Benachrichtigung an den Betreiber
    await transporter.sendMail({
      from: `"Taxi Graz GU Website" <${fromAddress}>`,
      to: contactEmail,
      replyTo: data.email,
      subject: `Neue Kontaktanfrage: ${data.subject || 'Allgemeine Anfrage'}`,
      html: `
        <h2>Neue Kontaktanfrage über die Website</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">E-Mail</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Telefon</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Betreff</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(data.subject || 'Allgemeine Anfrage')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Nachricht</td>
            <td style="padding: 8px 12px; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
          </tr>
        </table>
      `,
    })

    // Mail 2: Bestätigung an den Absender
    await transporter.sendMail({
      from: `"Taxi Graz GU" <${fromAddress}>`,
      to: data.email,
      subject: 'Ihre Anfrage bei Taxi Graz GU',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1a1a1a;">Vielen Dank für Ihre Nachricht!</h2>
          <p>Liebe/r ${escapeHtml(data.name)},</p>
          <p>wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.</p>
          <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 8px; font-weight: bold;">Ihre Nachricht:</p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          <p>Mit freundlichen Grüßen,<br>Ihr Taxi Graz GU Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999;">
            Taxi Graz GU &bull; Tel: +43 660 96 93 894 &bull; info@taxigraz-gu.at
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
