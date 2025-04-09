import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json()

    const data = await resend.emails.send({
      from: 'Investir En Soi <noreply@investirensoi.com>',
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #048B9A;">Investir En Soi</h2>
          <p>${message.replace(/\n/g, '<br/>')}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Ceci est un message automatique, merci de ne pas y répondre directement.
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
} 