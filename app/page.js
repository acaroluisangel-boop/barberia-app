import Link from 'next/link';
import { Scissors, Star, Shield, Smartphone, Clock, Trophy, Sparkles, Timer, MessageCircle, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/fotos/foto1.jpeg')"}} />
  <div className="absolute inset-0 bg-black/75" />
  <div className="relative z-10">
    <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4">Barbería Premium</p>
    <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white mb-4 leading-none w-full text-center">
  Blessed<span className="text-yellow-400">Barber</span>
</h1>
    <p className="text-base sm:text-xl text-zinc-400 mb-10 max-w-md px-4">
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
  <Link href="/reservar"
    className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-all hover:scale-105">
    Reservar cita →
  </Link>
  <a href="#servicios"
    className="border border-zinc-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-all">
    Ver servicios
  </a>
  <Link href="/galeria"
    className="border border-zinc-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-all">
    Ver cortes
  </Link>
</div>
  </div>
  <div className="absolute bottom-8 animate-bounce text-zinc-400 z-10">
    <ChevronDown size={32} />
  </div>
</section>

      {/* STATS */}
      <section className="py-16 px-8 border-y border-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            { num: '500+', label: 'Clientes satisfechos' },
            { num: '5+', label: 'Años de experiencia' },
            { num: '4.9★', label: 'Calificación promedio' },
            { num: '100%', label: 'Satisfacción garantizada' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-black text-yellow-400">{s.num}</p>
              <p className="text-zinc-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase text-center mb-3">Lo que hacemos</p>
          <h2 className="text-5xl font-black text-center mb-16">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { nombre: 'Corte', precio: '$15', desc: 'Corte clásico o moderno a tu estilo', icono: <Scissors size={32} /> },
              { nombre: 'Afeitado', precio: '$12', desc: 'Navaja y toalla caliente profesional', icono: <Scissors size={32} /> },
              { nombre: 'Barba', precio: '$10', desc: 'Perfilado y arreglo completo de barba', icono: <Sparkles size={32} /> },
              { nombre: 'Combo', precio: '$22', desc: 'Corte + Barba. El pack completo', icono: <Trophy size={32} /> },
            ].map((s) => (
              <div key={s.nombre}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center hover:border-yellow-400 transition-all hover:-translate-y-1 group">
                <div className="text-yellow-400 flex justify-center mb-4 group-hover:scale-110 transition-transform">{s.icono}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{s.nombre}</h3>
                <p className="text-zinc-500 my-3 text-sm">{s.desc}</p>
                <p className="text-3xl font-black text-yellow-400">{s.precio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-24 px-8 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase text-center mb-3">Nuestra diferencia</p>
          <h2 className="text-5xl font-black text-center mb-16">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { titulo: 'Barberos expertos', desc: 'Más de 5 años de experiencia en cortes modernos y clásicos.', icono: <Trophy size={28} /> },
              { titulo: 'Reserva online', desc: 'Agenda tu cita en segundos desde tu celular o computadora.', icono: <Smartphone size={28} /> },
              { titulo: 'Pago seguro', desc: 'Paga con tarjeta o Yape de forma rápida y segura.', icono: <Shield size={28} /> },
              { titulo: 'Productos premium', desc: 'Usamos las mejores marcas para el cuidado de tu cabello.', icono: <Sparkles size={28} /> },
              { titulo: 'Ambiente moderno', desc: 'Un espacio cómodo y bien equipado para tu experiencia.', icono: <Scissors size={28} /> },
              { titulo: 'Puntualidad garantizada', desc: 'Respetamos tu tiempo. Sin largas esperas.', icono: <Timer size={28} /> },
            ].map(i => (
              <div key={i.titulo} className="flex gap-4">
                <div className="text-yellow-400 mt-1 shrink-0">{i.icono}</div>
                <div>
                  <h3 className="font-bold text-white text-lg">{i.titulo}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase text-center mb-3">Lo que dicen</p>
          <h2 className="text-5xl font-black text-center mb-16">Reseñas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { nombre: 'Carlos M.', texto: 'El mejor corte que me han hecho. El ambiente es increíble y los barberos son muy profesionales.', estrellas: 5 },
              { nombre: 'Diego R.', texto: 'Reservé online y fue súper fácil. Llegué y me atendieron al instante. 100% recomendado.', estrellas: 5 },
              { nombre: 'Andrés P.', texto: 'Llevo 2 años yendo aquí y nunca me han fallado. Siempre salgo satisfecho.', estrellas: 5 },
            ].map(r => (
              <div key={r.nombre} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(r.estrellas)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-zinc-300 italic mb-4">"{r.texto}"</p>
                <p className="font-bold text-white">— {r.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="py-24 px-8 bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Visítanos</p>
          <h2 className="text-5xl font-black mb-12">Horarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { dia: 'Lunes - Viernes', hora: '9:00 AM - 8:00 PM' },
              { dia: 'Sábado', hora: '8:00 AM - 9:00 PM' },
              { dia: 'Domingo', hora: '9:00 AM - 6:00 PM' },
              { dia: 'Feriados', hora: '10:00 AM - 5:00 PM' },
            ].map(h => (
              <div key={h.dia} className="flex justify-between bg-zinc-800 px-6 py-4 rounded-xl">
                <span className="text-zinc-300 flex items-center gap-2"><Clock size={16} />{h.dia}</span>
                <span className="font-bold text-yellow-400">{h.hora}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-8 text-center">
        <h2 className="text-5xl font-black mb-4">¿Listo para verte bien?</h2>
        <p className="text-zinc-400 text-xl mb-10">Reserva tu cita ahora en segundos.</p>
        <Link href="/reservar"
          className="bg-yellow-400 text-black px-10 py-5 rounded-full text-xl font-black hover:bg-yellow-300 transition-all hover:scale-105 inline-block">
          Reservar ahora →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8 px-8 text-center text-zinc-500 text-sm">
        <p className="text-2xl font-black text-white mb-2">Blessed<span className="text-yellow-400">Barber</span></p>
        <p>© 2026 BarberKing. Todos los derechos reservados.</p>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a href="https://wa.me/51999999999" target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-all hover:scale-110 z-50">
        <MessageCircle size={24} />
      </a>

    </main>
  );
}