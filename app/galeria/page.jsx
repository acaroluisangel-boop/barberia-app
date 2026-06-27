import Link from 'next/link';

const fotos = [
  { src: '/fotos/foto1.jpeg', titulo: 'Mullet' },
  { src: '/fotos/foto2.jpeg', titulo: 'Taper Fade' },
  { src: '/fotos/foto3.jpeg', titulo: 'High Fade' },
  { src: '/fotos/foto4.jpeg', titulo: 'Corte Clásico' },
  { src: '/fotos/foto5.jpeg', titulo: 'Degradado' },
  { src: '/fotos/foto7.jpeg', titulo: 'Corte + Barba' },
  { src: '/fotos/foto6.jpeg', titulo: 'Afeitado' },
];

export default function Galeria() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase text-center mb-3">Nuestro trabajo</p>
        <h1 className="text-5xl font-black text-center mb-16">Galería de Cortes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fotos.map((f) => (
            <div key={f.src} className="group relative overflow-hidden rounded-2xl border border-zinc-800 hover:border-yellow-400 transition-all">
              <img src={f.src} alt={f.titulo}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="font-bold text-white text-lg">{f.titulo}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/reservar"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105">
            Reservar cita →
          </Link>
        </div>
      </div>
    </main>
  );
}