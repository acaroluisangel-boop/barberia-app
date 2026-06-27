export default function Confirmacion() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">¡Listo!</h1>
        <p className="text-xl text-gray-300 mb-8">Tu cita ha sido confirmada. Te esperamos.</p>
        <a href="/" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300">
          Volver al inicio
        </a>
      </div>
    </main>
  );
}