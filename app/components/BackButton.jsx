'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 bg-zinc-900/80 backdrop-blur text-white p-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all">
      <ArrowLeft size={20} />
    </button>
  );
}