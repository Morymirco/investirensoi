import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Adresse email vérifiée pour les tests
const TEST_EMAIL = 'morykoulibaly996@gmail.com'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Template HTML commun pour les emails
const emailTemplate = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Investir En Soi - Contact</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #FFFFFF;
          background-color: #0A0B1C;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #151627;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #1C1D33;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          color: #FFFFFF;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #FFFFFF;
          font-size: 14px;
        }
        h1, h2, h3 {
          color: #FFFFFF;
          margin-top: 0;
        }
        .accent {
          color: #048B9A;
        }
        p {
          color: #FFFFFF;
        }
        .button {
          display: inline-block;
          background-color: #048B9A;
          color: #FFFFFF;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
        }
        .tag {
          display: inline-block;
          background-color: rgba(4, 139, 154, 0.2);
          color: #FFFFFF;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
        }
        .message-box {
          background-color: #151627;
          padding: 15px;
          border-radius: 6px;
          color: #FFFFFF;
          margin: 20px 0;
        }
        .contact-info {
          margin-top: 20px;
          padding: 15px;
          background-color: #151627;
          border-radius: 6px;
        }
        .contact-row {
          display: flex;
          margin-bottom: 10px;
        }
        .contact-label {
          font-weight: bold;
          width: 100px;
          color: #048B9A;
        }
        .contact-value {
          color: #FFFFFF;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://investirensoi.vercel.app/logo.png" alt="Investir En Soi" height="40" style="margin-bottom: 10px;">
          ${!IS_PRODUCTION ? '<div class="tag">MODE TEST</div>' : ''}
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Investir En Soi. Tous droits réservés.</p>
        </div>
      </div>
    </body>
  </html>
`;

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      return NextResponse.json(
        { error: 'Configuration du serveur email manquante (RESEND_API_KEY)' },
        { status: 500 }
      );
    }

    const { name, email, subject, message, phone } = await request.json();

    // Vérification des champs requis
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    try {
      // Email à l'équipe
      const teamEmailContent = `
        <h1>Nouveau message de contact</h1>
        <div class="contact-info">
          <div class="contact-row">
            <div class="contact-label">Nom:</div>
            <div class="contact-value">${name}</div>
          </div>
          <div class="contact-row">
            <div class="contact-label">Email:</div>
            <div class="contact-value">${email}</div>
          </div>
          ${phone ? `
          <div class="contact-row">
            <div class="contact-label">Téléphone:</div>
            <div class="contact-value">${phone}</div>
          </div>
          ` : ''}
          <div class="contact-row">
            <div class="contact-label">Sujet:</div>
            <div class="contact-value">${subject}</div>
          </div>
        </div>
        
        <h2>Message:</h2>
        <div class="message-box">
          ${message.replace(/\n/g, '<br/>')}
        </div>
        
        <a href="mailto:${email}" class="button">
          Répondre directement
        </a>
      `;

      const teamEmailResult = await resend.emails.send({
        from: 'Investir En Soi <onboarding@resend.dev>',
        to: [IS_PRODUCTION ? 'contact@investirensoi.com' : TEST_EMAIL],
        subject: `[Contact] ${subject}`,
        html: emailTemplate(teamEmailContent),
      });

      console.log('Team email result:', teamEmailResult);

      if (teamEmailResult.error) {
        throw teamEmailResult.error;
      }

      // Email de confirmation à l'expéditeur
      const senderEmailContent = `
        <h1>Merci pour votre message !</h1>
        <p>Cher(e) ${name},</p>
        
        <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés. Notre équipe va l'examiner et vous répondra dans les plus brefs délais.</p>
        
        <h2>Récapitulatif de votre message :</h2>
        <div class="contact-info">
          <div class="contact-row">
            <div class="contact-label">Sujet:</div>
            <div class="contact-value">${subject}</div>
          </div>
        </div>
        
        <div class="message-box">
          ${message.replace(/\n/g, '<br/>')}
        </div>
        
        <p>Si vous avez d'autres questions ou besoin d'informations supplémentaires, n'hésitez pas à nous contacter à nouveau.</p>
        
        <p>Cordialement,<br>L'équipe Investir En Soi</p>
      `;

      const senderEmailResult = await resend.emails.send({
        from: 'Investir En Soi <onboarding@resend.dev>',
        to: [IS_PRODUCTION ? email : TEST_EMAIL],
        subject: 'Confirmation de réception de votre message',
        html: emailTemplate(senderEmailContent),
      });

      console.log('Sender email result:', senderEmailResult);

      return NextResponse.json({ 
        success: true, 
        teamEmail: teamEmailResult,
        senderEmail: senderEmailResult,
        mode: IS_PRODUCTION ? 'production' : 'test'
      });
    } catch (emailError: any) {
      console.error('Resend error details:', {
        message: emailError.message,
        name: emailError.name,
        statusCode: emailError.statusCode,
        cause: emailError.cause
      });
      
      return NextResponse.json(
        { 
          error: `Erreur lors de l'envoi de l'email: ${emailError.message}`,
          details: emailError
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Global error:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi de l\'email',
        details: error.message
      },
      { status: 500 }
    );
  }
} 