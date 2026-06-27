import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { enviarConfirmacion } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response('Webhook error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const citaId = session.metadata.citaId;

    await supabase
      .from('citas')
      .update({ pagado: true, stripe_payment_id: session.payment_intent, estado: 'confirmada' })
      .eq('id', citaId);

    const { data: cita } = await supabase
      .from('citas')
      .select('*, clientes(*), servicios(*)')
      .eq('id', citaId)
      .single();

    if (cita) {
      await enviarConfirmacion({
        nombre: cita.clientes.nombre,
        email: cita.clientes.email,
        servicio: cita.servicios.nombre,
        fecha: new Date(cita.fecha_hora).toLocaleString('es-PE'),
      });
    }
  }

  return Response.json({ received: true });
}