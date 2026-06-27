import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarConfirmacion({ nombre, email, servicio, fecha }) {
  const { error } = await resend.emails.send({
    from: 'BarberKing <onboarding@resend.dev>',
    to: email,
    subject: '✅ Cita confirmada en BarberKing',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #111; color: #fff; padding: 30px; border-radius: 12px;">
        <h1 style="color: #facc15;">BarberKing</h1>
        <h2>¡Hola ${nombre}!</h2>
        <p>Tu cita ha sido confirmada.</p>
        <div style="background: #222; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Fecha y hora:</strong> ${fecha}</p>
        </div>
        <p>Te esperamos. Si necesitas cancelar, escríbenos por WhatsApp.</p>
        <p style="color: #facc15;">— Equipo BarberKing</p>
      </div>
    `,
  });

  if (error) console.error('Email error:', error);
  return !error;
}