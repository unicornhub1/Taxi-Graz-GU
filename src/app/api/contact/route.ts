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
    const forwardEmail = process.env.FORWARD_EMAIL
    const fromAddress = process.env.SMTP_USER || 'info@taxigraz-gu.at'
    const toAddresses = forwardEmail
      ? `${contactEmail}, ${forwardEmail}`
      : contactEmail

    const subject = escapeHtml(data.subject || 'Allgemeine Anfrage')
    const logoUrl = 'https://taxigraz-gu.at/email-logo.svg'

    // Mail 1: Benachrichtigung an den Betreiber
    await transporter.sendMail({
      from: `"Taxi Graz GU Website" <${fromAddress}>`,
      to: toAddresses,
      replyTo: data.email,
      subject: `Neue Kontaktanfrage: ${data.subject || 'Allgemeine Anfrage'}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #FAFAF8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAF8; padding: 32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

        <!-- Header with Logo -->
        <tr><td style="background-color: #0A0A0A; border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
          <img src="${logoUrl}" alt="Taxi Graz GU" width="240" height="93" style="display: block; margin: 0 auto; max-width: 240px; height: auto;" />
        </td></tr>

        <!-- Gold Accent Bar -->
        <tr><td style="background-color: #E8B931; height: 4px;"></td></tr>

        <!-- Content -->
        <tr><td style="background-color: #FFFFFF; padding: 40px;">
          <h1 style="margin: 0 0 4px; font-size: 22px; font-weight: 700; color: #0A0A0A;">Neue Kontaktanfrage</h1>
          <p style="margin: 0 0 28px; font-size: 14px; color: #6E6E66;">Eingegangen &uuml;ber taxigraz-gu.at</p>

          <!-- Data Table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #EFEFED; border-radius: 12px; overflow: hidden;">
            <tr>
              <td style="padding: 14px 16px; font-size: 13px; font-weight: 600; color: #6E6E66; background: #F7F7F5; width: 100px; border-bottom: 1px solid #EFEFED;">Name</td>
              <td style="padding: 14px 16px; font-size: 14px; color: #0A0A0A; border-bottom: 1px solid #EFEFED;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 14px 16px; font-size: 13px; font-weight: 600; color: #6E6E66; background: #F7F7F5; border-bottom: 1px solid #EFEFED;">E-Mail</td>
              <td style="padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #EFEFED;"><a href="mailto:${escapeHtml(data.email)}" style="color: #C99B1D; text-decoration: none;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 14px 16px; font-size: 13px; font-weight: 600; color: #6E6E66; background: #F7F7F5; border-bottom: 1px solid #EFEFED;">Telefon</td>
              <td style="padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #EFEFED;"><a href="tel:${escapeHtml(data.phone)}" style="color: #C99B1D; text-decoration: none;">${escapeHtml(data.phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 14px 16px; font-size: 13px; font-weight: 600; color: #6E6E66; background: #F7F7F5; border-bottom: 1px solid #EFEFED;">Betreff</td>
              <td style="padding: 14px 16px; font-size: 14px; color: #0A0A0A; border-bottom: 1px solid #EFEFED;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 14px 16px; font-size: 13px; font-weight: 600; color: #6E6E66; background: #F7F7F5; vertical-align: top;">Nachricht</td>
              <td style="padding: 14px 16px; font-size: 14px; color: #0A0A0A; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color: #0F0F0D; border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #6E6E66;">Taxi Graz GU &bull; Walter-Goldschmidt-Gasse 31, 8042 Graz</p>
          <p style="margin: 4px 0 0; font-size: 12px; color: #4A4A44;">Diese E-Mail wurde automatisch von taxigraz-gu.at gesendet.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    })

    // Mail 2: Bestätigung an den Absender
    await transporter.sendMail({
      from: `"Taxi Graz GU" <${fromAddress}>`,
      to: data.email,
      subject: 'Ihre Anfrage bei Taxi Graz GU – Wir melden uns!',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #FAFAF8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAF8; padding: 32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

        <!-- Header with Logo -->
        <tr><td style="background-color: #0A0A0A; border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
          <a href="https://taxigraz-gu.at" style="text-decoration: none;">
            <img src="${logoUrl}" alt="Taxi Graz GU" width="240" height="93" style="display: block; margin: 0 auto; max-width: 240px; height: auto;" />
          </a>
        </td></tr>

        <!-- Gold Accent Bar -->
        <tr><td style="background-color: #E8B931; height: 4px;"></td></tr>

        <!-- Content -->
        <tr><td style="background-color: #FFFFFF; padding: 40px;">
          <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #0A0A0A;">Vielen Dank, ${escapeHtml(data.name)}!</h1>
          <p style="margin: 0 0 12px; font-size: 15px; color: #2E2E2A; line-height: 1.7;">
            Wir haben Ihre Nachricht erhalten und melden uns schnellstm&ouml;glich bei Ihnen.
          </p>
          <p style="margin: 0 0 8px; font-size: 15px; color: #2E2E2A; line-height: 1.7;">
            F&uuml;r dringende Anliegen erreichen Sie uns jederzeit telefonisch unter
            <a href="tel:+436601083003" style="color: #C99B1D; text-decoration: none; font-weight: 600;">+43 660 1083003</a>.
          </p>

          <!-- Message Recap -->
          <div style="margin-top: 28px; background-color: #F7F7F5; border-radius: 12px; padding: 24px; border-left: 4px solid #E8B931;">
            <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #9A9A92;">Ihre Nachricht</p>
            <p style="margin: 8px 0 0; font-size: 13px; font-weight: 600; color: #0A0A0A;">${subject}</p>
            <p style="margin: 12px 0 0; font-size: 14px; color: #4A4A44; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color: #0F0F0D; border-radius: 0 0 16px 16px; padding: 32px 40px; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #FFFFFF;">Taxi Graz GU</p>
          <p style="margin: 0 0 16px; font-size: 12px; color: #6E6E66;">Walter-Goldschmidt-Gasse 31 &bull; 8042 Graz</p>
          <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
            <tr>
              <td style="padding: 0 8px;"><a href="tel:+436601083003" style="font-size: 12px; color: #E8B931; text-decoration: none;">+43 660 1083003</a></td>
              <td style="color: #4A4A44;">|</td>
              <td style="padding: 0 8px;"><a href="https://wa.me/436601083003" style="font-size: 12px; color: #E8B931; text-decoration: none;">WhatsApp</a></td>
              <td style="color: #4A4A44;">|</td>
              <td style="padding: 0 8px;"><a href="https://taxigraz-gu.at" style="font-size: 12px; color: #E8B931; text-decoration: none;">taxigraz-gu.at</a></td>
            </tr>
          </table>
          <p style="margin: 16px 0 0; font-size: 11px; color: #4A4A44;">Mit freundlichen Gr&uuml;&szlig;en, Ihr Taxi Graz GU Team</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
