'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError('Credenciales incorrectas');
    router.push('/admin');
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Admin</h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <input type="email" required placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-4 text-white" />
        <input type="password" required placeholder="Contraseña" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-zinc-800 rounded-lg px-4 py-3 mb-6 text-white" />
        <button type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-300">
          Entrar
        </button>
      </form>
    </main>
  );
}