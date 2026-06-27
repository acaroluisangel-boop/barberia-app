'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [citas, setCitas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tab, setTab] = useState('citas');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return router.push('/admin/login');
    });

    supabase.from('citas').select('*, clientes(*), servicios(*)')
      .order('fecha_hora', { ascending: false })
      .then(({ data }) => setCitas(data || []));

    supabase.from('clientes').select('*')
      .order('fecha_registro', { ascending: false })
      .then(({ data }) => setClientes(data || []));
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">Panel Admin</h1>
        <button onClick={cerrarSesion} className="text-gray-400 hover:text-white">Cerrar sesión</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-800 p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-yellow-400">{clientes.length}</p>
          <p className="text-gray-400">Clientes</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-yellow-400">{citas.length}</p>
          <p className="text-gray-400">Citas totales</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-yellow-400">{citas.filter(c => c.pagado).length}</p>
          <p className="text-gray-400">Pagadas</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab('citas')}
          className={`px-6 py-2 rounded-full font-bold ${tab === 'citas' ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}>
          Citas
        </button>
        <button onClick={() => setTab('clientes')}
          className={`px-6 py-2 rounded-full font-bold ${tab === 'clientes' ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}>
          Clientes
        </button>
      </div>

      {tab === 'citas' && (
        <table className="w-full bg-zinc-900 rounded-xl overflow-hidden">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-4 text-left">Cliente</th>
              <th className="p-4 text-left">Servicio</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Pago</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(c => (
              <tr key={c.id} className="border-t border-zinc-800">
                <td className="p-4">{c.clientes?.nombre}</td>
                <td className="p-4">{c.servicios?.nombre}</td>
                <td className="p-4">{new Date(c.fecha_hora).toLocaleString('es-PE')}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    c.estado === 'confirmada' ? 'bg-green-900 text-green-400' : 'bg-zinc-700'
                  }`}>{c.estado}</span>
                </td>
                <td className="p-4">{c.pagado ? '✅ Pagado' : '⏳ Pendiente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'clientes' && (
        <table className="w-full bg-zinc-900 rounded-xl overflow-hidden">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Teléfono</th>
              <th className="p-4 text-left">Registro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id} className="border-t border-zinc-800">
                <td className="p-4">{c.nombre}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4">{c.telefono}</td>
                <td className="p-4">{new Date(c.fecha_registro).toLocaleDateString('es-PE')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}