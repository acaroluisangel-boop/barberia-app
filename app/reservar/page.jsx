'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import BackButton from '@/app/components/BackButton';

export default function Reservar() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    servicio_id: '', fecha_hora: '',
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('servicios').select('*').then(({ data }) => setServicios(data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      // 1. Buscar cliente existente
      let clienteId;
      const { data: clienteExistente } = await supabase
        .from('clientes')
        .select('id')
        .eq('email', form.email)
        .maybeSingle();

      if (clienteExistente) {
        clienteId = clienteExistente.id;
      } else {
        // 2. Crear cliente nuevo
        const { data: nuevoCliente, error: errorCliente } = await supabase
          .from('clientes')
          .insert({ nombre: form.nombre, email: form.email, telefono: form.telefono })
          .select('id')
          .single();

        if (errorCliente) throw new Error('Error al guardar cliente: ' + errorCliente.message);
        clienteId = nuevoCliente.id;
      }

      // 3. Crear cita
      const { data: cita, error: errorCita } = await supabase
        .from('citas')
        .insert({ cliente_id: clienteId, servicio_id: form.servicio_id, fecha_hora: form.fecha_hora })
        .select('id')
        .single();

      if (errorCita) throw new Error('Error al crear cita: ' + errorCita.message);

      // 4. Ir a Stripe
      const servicio = servicios.find(s => s.id === form.servicio_id);
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servicioNombre: servicio.nombre,
          precio: servicio.precio,
          citaId: cita.id,
        }),
      });

      const { url } = await res.json();
      window.location.href = url;

    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <BackButton />
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Reservar cita</h1>

        {error && <p className="text-red-400 mb-4 bg-red-900/20 p-3 rounded-lg">{error}</p>}

        <input required placeholder="Tu nombre" value={form.nombre}
          onChange={e => setForm({...form, nombre: e.target.value})}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-4 text-white" />

        <input required type="email" placeholder="Tu email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-4 text-white" />

        <input required placeholder="Tu teléfono" value={form.telefono}
          onChange={e => setForm({...form, telefono: e.target.value})}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-4 text-white" />

        <select required value={form.servicio_id}
          onChange={e => setForm({...form, servicio_id: e.target.value})}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-4 text-white">
          <option value="">Selecciona un servicio</option>
          {servicios.map(s => (
            <option key={s.id} value={s.id}>{s.nombre} — ${s.precio}</option>
          ))}
        </select>

        <input required type="datetime-local" value={form.fecha_hora}
          onChange={e => setForm({...form, fecha_hora: e.target.value})}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-6 text-white" />

        <button type="submit" disabled={cargando}
          className="w-full bg-yellow-400 text-black py-4 rounded-full font-bold text-lg hover:bg-yellow-300 disabled:opacity-50">
          {cargando ? 'Procesando...' : 'Confirmar y pagar'}
        </button>
      </form>
    </main>
  );
}