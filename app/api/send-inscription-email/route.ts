import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/services/firestore';
import { doc, getDoc } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse email vérifiée pour les tests
const TEST_EMAIL = 'morykoulibaly996@gmail.com';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Template HTML commun pour les emails
const emailTemplate = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Investir En Soi</title>
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
        ul {
          list-style: none;
          padding: 0;
          margin: 20px 0;
          color: #FFFFFF;
        }
        li {
          padding: 10px 0;
          border-bottom: 1px solid #2D2E47;
          color: #FFFFFF;
        }
        li:last-child {
          border-bottom: none;
        }
        li strong {
          color: #FFFFFF;
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
        .step-number {
          background-color: #048B9A;
          color: #FFFFFF;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        .message-box {
          background-color: #151627;
          padding: 15px;
          border-radius: 6px;
          color: #FFFFFF;
        }
        .formation-card {
          background-color: #151627;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .formation-title {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .formation-details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 10px;
        }
        .formation-detail {
          background-color: #1C1D33;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 14px;
        }
        .formation-price {
          font-size: 18px;
          font-weight: bold;
          color: #048B9A;
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
          <p>Vous recevez cet email car vous avez fait une demande d'inscription à une formation.</p>
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

    const body = await request.json();
    console.log('Received body:', body);

    const { nom, prenom, email, telephone, pays, entreprise, fonction, message, formationId } = body;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !telephone || !formationId) {
      console.error('Missing required fields:', { nom, prenom, email, telephone, formationId });
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    try {
      // Récupérer les informations de la formation depuis Firestore
      const formationRef = doc(db, "formations", formationId);
      const formationSnap = await getDoc(formationRef);
      
      if (!formationSnap.exists()) {
        return NextResponse.json(
          { error: 'Formation non trouvée' },
          { status: 404 }
        );
      }
      
      const formationData = formationSnap.data();
      console.log('Formation data:', formationData);
      
      // En mode test, on envoie tout à l'adresse de test
      // const toEmail = IS_PRODUCTION ? 'contact@investirensoi.com' : TEST_EMAIL;
      const toEmail = 'morykoulibaly996@gmail.com'
      
      console.log(toEmail)
      // Email à l'agence
      console.log('Sending email to agency...');
      const agencyEmailContent = `
        <h1 style="color: #FFFFFF;">Nouvelle demande d'inscription</h1>
        
        <div class="formation-card">
          <div class="formation-title">${formationData.titre}</div>
          <div class="formation-details">
            <span class="formation-detail">${formationData.categorie}</span>
            <span class="formation-detail">${formationData.duree}</span>
            <span class="formation-detail">${formationData.niveau}</span>
          </div>
          <div class="formation-price">${formationData.prix.toLocaleString()} GNF</div>
        </div>
        
        <h2 style="margin-top: 30px; color: #FFFFFF;">Informations du candidat</h2>
        <ul style="color: #FFFFFF;">
          <li><strong style="color: #FFFFFF;">Nom:</strong> <span style="color: #FFFFFF;">${nom}</span></li>
          <li><strong style="color: #FFFFFF;">Prénom:</strong> <span style="color: #FFFFFF;">${prenom}</span></li>
          <li><strong style="color: #FFFFFF;">Email:</strong> <span style="color: #FFFFFF;">${email}</span></li>
          <li><strong style="color: #FFFFFF;">Téléphone:</strong> <span style="color: #FFFFFF;">${telephone}</span></li>
          <li><strong style="color: #FFFFFF;">Pays:</strong> <span style="color: #FFFFFF;">${pays}</span></li>
          ${entreprise ? `<li><strong style="color: #FFFFFF;">Entreprise:</strong> <span style="color: #FFFFFF;">${entreprise}</span></li>` : ''}
          ${fonction ? `<li><strong style="color: #FFFFFF;">Fonction:</strong> <span style="color: #FFFFFF;">${fonction}</span></li>` : ''}
        </ul>
        
        ${message ? `
        <h2 style="margin-top: 30px; color: #FFFFFF;">Message du candidat</h2>
        <div class="message-box" style="color: #FFFFFF;">${message}</div>
        ` : ''}
        
        <a href="https://investirensoi.com/admin/formations/${formationId}" class="button" style="color: #FFFFFF;">
          Voir les détails de la formation
        </a>
      `;

      const agencyEmailResult = await resend.emails.send({
        from: 'Investir En Soi <onboarding@resend.dev>',
        to: [toEmail],
        subject: `[TEST] Nouvelle inscription: ${formationData.titre}`,
        html: emailTemplate(agencyEmailContent),
      });

      console.log('Agency email result:', agencyEmailResult);

      if (agencyEmailResult.error) {
        throw agencyEmailResult.error;
      }

      // Email au candidat
      console.log('Sending confirmation email...');
      const candidateEmailContent = `
        <h1 style="color: #FFFFFF;">Merci pour votre demande d'inscription !</h1>
        <p style="color: #FFFFFF;">Cher(e) <span style="color: #FFFFFF;">${prenom} ${nom}</span>,</p>
        
        <p style="color: #FFFFFF;">Nous avons bien reçu votre demande d'inscription à notre formation :</p>
        
        <div class="formation-card">
          <div class="formation-title">${formationData.titre}</div>
          <div class="formation-details">
            <span class="formation-detail">${formationData.categorie}</span>
            <span class="formation-detail">${formationData.duree}</span>
            <span class="formation-detail">${formationData.niveau}</span>
          </div>
          <div class="formation-price">${formationData.prix.toLocaleString()} GNF</div>
        </div>
        
        <p style="color: #FFFFFF;">Notre équipe va examiner votre demande et vous contactera très prochainement pour finaliser votre inscription.</p>
        
        <h2 style="margin-top: 30px; color: #FFFFFF;">Récapitulatif de vos informations</h2>
        <ul style="color: #FFFFFF;">
          <li><strong style="color: #FFFFFF;">Nom complet:</strong> <span style="color: #FFFFFF;">${prenom} ${nom}</span></li>
          <li><strong style="color: #FFFFFF;">Email:</strong> <span style="color: #FFFFFF;">${email}</span></li>
          <li><strong style="color: #FFFFFF;">Téléphone:</strong> <span style="color: #FFFFFF;">${telephone}</span></li>
        </ul>

        <h2 style="margin-top: 30px; color: #FFFFFF;">Prochaines étapes</h2>
        <ul style="list-style-type: none; padding-left: 0; color: #FFFFFF;">
          <li style="display: flex; align-items: center; margin-bottom: 15px; color: #FFFFFF;">
            <span class="step-number" style="color: #FFFFFF;">1</span>
            <span style="color: #FFFFFF;">Notre équipe examine votre demande</span>
          </li>
          <li style="display: flex; align-items: center; margin-bottom: 15px; color: #FFFFFF;">
            <span class="step-number" style="color: #FFFFFF;">2</span>
            <span style="color: #FFFFFF;">Nous vous contactons pour confirmer les détails</span>
          </li>
          <li style="display: flex; align-items: center; color: #FFFFFF;">
            <span class="step-number" style="color: #FFFFFF;">3</span>
            <span style="color: #FFFFFF;">Vous recevez les informations pratiques</span>
          </li>
        </ul>

        <p style="margin-top: 30px; color: #FFFFFF;">Si vous avez des questions entre-temps, n'hésitez pas à nous contacter :</p>
        <a href="mailto:contact@investirensoi.com" class="button" style="color: #FFFFFF;">
          Nous contacter
        </a>
        
        <p style="margin-top: 30px; color: #FFFFFF;">Cordialement,<br>L'équipe Investir En Soi</p>
      `;

      const candidateEmailResult = await resend.emails.send({
        from: 'Investir En Soi <onboarding@resend.dev>',
        to: [IS_PRODUCTION ? email : TEST_EMAIL],
        subject: `[TEST] Confirmation d'inscription: ${formationData.titre}`,
        html: emailTemplate(candidateEmailContent),
      });

      console.log('Candidate email result:', candidateEmailResult);

      return NextResponse.json({ 
        success: true,
        agencyEmail: agencyEmailResult,
        candidateEmail: candidateEmailResult,
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