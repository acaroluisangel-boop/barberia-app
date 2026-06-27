import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { servicioNombre, precio, citaId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: servicioNombre },
        unit_amount: Math.round(precio * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/confirmacion?cita=${citaId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/reservar`,
    metadata: { citaId },
  });

  return Response.json({ url: session.url });
}