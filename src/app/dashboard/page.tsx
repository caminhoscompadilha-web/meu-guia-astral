
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';

export default function DashboardGuia() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('user_astral_data');
    if (data) {
      setUserData(JSON.parse(data));
    }
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
        <p className="text-purple-300 font-serif animate-pulse">Consultando as efemérides e o oráculo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Saudação e Resumo do Dia */}
        <header className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-2">Olá, {userData?.nome || 'Explorador Astral'}</h2>
          <p className="text-slate-400">Este é o seu guia personalizado para os próximos 30 dias.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: A Trindade (Sol, Lua, Ascendente) */}
          <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm">
            <h3 className="text-purple-400 uppercase text-xs font-bold tracking-widest mb-6">Essência e Personalidade</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌞</span>
                <div>
                  <p className="text-sm text-slate-500">Sol (Luz e Sombra)</p>
                  <p className="font-bold text-lg text-slate-200">Capricórnio ♑</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌙</span>
                <div>
                  <p className="text-sm text-slate-500">Lua (Emocional)</p>
                  <p className="font-bold text-lg text-slate-200">Escorpião ♏</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl">⬆️</span>
                <div>
                  <p className="text-sm text-slate-500">Ascendente (Máscara Social)</p>
                  <p className="font-bold text-lg text-slate-200">Leão ♌</p>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Tarot do Dia e Arquetipo */}
          <section className="bg-gradient-to-b from-indigo-900/20 to-slate-900/40 border border-indigo-500/20 p-6 rounded-3xl">
            <h3 className="text-indigo-400 uppercase text-xs font-bold tracking-widest mb-6">Sincronicidade do Dia</h3>
            <div className="text-center">
              <div className="w-24 h-40 bg-indigo-950 border-2 border-indigo-400/50 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                 <span className="text-4xl">🔮</span>
              </div>
              <h4 className="text-xl font-serif font-bold mb-2">O Eremita (IX)</h4>
              <p className="text-sm text-slate-400 italic">"Um momento de introspecção para iluminar o próximo passo."</p>
            </div>
          </section>

          {/* Card 3: Nodos Lunares (Missão de Vida) */}
          <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
            <h3 className="text-amber-400 uppercase text-xs font-bold tracking-widest mb-6">Eixo do Destino</h3>
            <div className="space-y-4">
              <div className="p-3 bg-amber-900/10 border border-amber-900/30 rounded-xl">
                <p className="text-xs text-amber-500 font-bold uppercase">Nodo Norte (Propósito)</p>
                <p className="text-slate-200">Peixes: Desenvolver a compaixão e a espiritualidade.</p>
              </div>
              <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
                <p className="text-xs text-slate-500 font-bold uppercase">Nodo Sul (Sombra)</p>
                <p className="text-slate-400">Virgem: Superar o perfeccionismo e a autocrítica.</p>
              </div>
            </div>
          </section>

          {/* Card 4: Astrocartografia Mundial (Full Width) */}
          <section className="md:col-span-3 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-blue-400 uppercase text-xs font-bold tracking-widest mb-6">📍 Geopolítica da Alma (Astrocartografia)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 h-2 mt-2 bg-green-500 rounded-full shadow-[0_0_10px_green]"></div>
                  <div>
                    <p className="font-bold text-green-400">Linha de Vênus (Luz) - Europa Meridional</p>
                    <p className="text-sm text-slate-400 italic">Probabilidades: Favorece parcerias, beleza e prosperidade material.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 mt-2 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
                  <div>
                    <p className="font-bold text-red-400">Linha de Saturno (Sombra) - América do Norte</p>
                    <p className="text-sm text-slate-400 italic">Alertas: Desafios estruturais, restrições e necessidade de disciplina rígida.</p>
                  </div>
                </div>
              </div>
              {/* Espaço para o Mapa Visual (Futuro) */}
              <div className="bg-slate-950 h-48 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-700 font-serif">
                [Visualização do Mapa Mundi Ativado]
              </div>
            </div>
          </section>

          {/* Card 5: Análise Profunda da IA */}
          <section className="md:col-span-3 bg-gradient-to-r from-purple-900/10 to-blue-900/10 border border-purple-500/20 p-8 rounded-3xl">
            <h3 className="text-purple-300 uppercase text-xs font-bold tracking-widest mb-6">Aconselhamento do Oráculo (Gemini 1.5 Flash)</h3>
            <p className="text-lg leading-relaxed text-slate-300 font-serif">
               "Neste ciclo de 30 dias, sua essência capricorniana será desafiada pela fluidez do seu Nodo Norte em Peixes. 
               A carta do Eremita sugere que a resposta que você busca não está no mundo exterior, mas no silêncio. 
               Cuidado com a sombra da Lua em Escorpião, que pode trazer desconfianças infundadas. Use a luz de Vênus 
               para reconectar-se com seu propósito criativo..."
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
