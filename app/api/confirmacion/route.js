import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { nombre, email, servicio, fecha } = await request.json();

  await resend.emails.send({
    from: 'BlessedBarber <onboarding@resend.dev>',
    to: email,
    subject: '✅ Cita confirmada en BlessedBarber',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #111; color: #fff; padding: 30px; border-radius: 12px;">
        <h1 style="color: #facc15;">BlessedBarber</h1>
        <h2>¡Hola ${nombre}!</h2>
        <p>Tu cita ha sido confirmada.</p>
        <div style="background: #222; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Fecha y hora:</strong> ${fecha}</p>
        </div>
        <p>Recuerda que el pago se realiza en el local con Yape, Plin o efectivo.</p>
        <p style="color: #facc15;">— Equipo BlessedBarber</p>
      </div>
    `,
  });

  return Response.json({ ok: true });
}