'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const router = useRouter();

  const handleUnlock = () => {
    if (nome && dataNascimento) {
      const params = new URLSearchParams({ nome, dataNascimento });
      router.push(`/ciclo?${params.toString()}`);
    } else {
      alert('Por favor, preencha seu nome e data de nascimento para organizar o céu.');
    }
  };

  return (
    <main className="min-h-screen bg-noite-profunda text-white p-4 font-serif flex flex-col items-center justify-center">
      <section className="bg-black/60 p-8 border border-dourado-luxo/30 rounded-lg shadow-2xl max-w-2xl w-full text-center">
        
        <header className="mb-10">
          <h1 className="tracking-[0.6em] text-sm m-0 text-dourado-luxo">PORTAL MEU GUIA ASTRAL</h1>
          <div className="w-[50px] h-px bg-dourado-luxo my-5 mx-auto"></div>
          <h2 className="text-3xl font-light">Dossiê de Autoconhecimento</h2>
        </header>

        <p className="leading-[1.8] text-base mb-8 italic">
          "O universo não fala por coincidências, mas por sinais. <br/>
          Descubra a mensagem que o Céu e as Energias têm para você."
        </p>

        <div className="space-y-6 text-left bg-black/40 p-6 rounded border border-dourado-luxo/10 mb-8">
          <div>
            <label className="block text-dourado-luxo text-xs uppercase mb-1">Nome Completo</label>
            <input 
              type="text" 
              placeholder="Seu nome de batismo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white outline-none focus:border-dourado-luxo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-dourado-luxo text-xs uppercase mb-1">Data de Nascimento</label>
              <input 
                type="date" 
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white"
              />
            </div>
            <div>
              <label className="block text-dourado-luxo text-xs uppercase mb-1">Hora Exata (24h)</label>
              <input type="time" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white" />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-purple-900/10 border border-purple-500/20 rounded">
            <input type="checkbox" className="mt-1" id="nao-sei-hora" />
            <label htmlFor="nao-sei-hora" className="text-xs text-gray-400">
              Não sei o meu horário. O sistema assumirá 12:00h (Mapa de Essência).
            </label>
          </div>
        </div>

        <button 
          onClick={handleUnlock}
          className="w-full py-4 bg-dourado-luxo text-black font-bold tracking-widest hover:bg-yellow-600 transition-all rounded"
        >
          DESBLOQUEAR MEU MAPA (R$ 47,90)
        </button>

      </section>
    </main>
  );
}