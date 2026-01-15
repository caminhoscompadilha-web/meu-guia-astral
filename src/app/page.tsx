import React from 'react';

export default function PortalAstral() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-serif p-6">
      <header className="text-center py-12 border-b border-amber-900/20">
        <h1 className="text-[#D4AF37] tracking-[0.4em] uppercase text-xs mb-2">Portal Meu Guia Astral</h1>
        <h2 className="text-3xl text-white font-light italic">Dossiê de Autoconhecimento</h2>
      </header>
      
      <main className="max-w-4xl mx-auto mt-12 space-y-12">
        <section className="bg-black/40 border border-amber-900/30 p-8 rounded-lg shadow-2xl">
          <h3 className="text-[#D4AF37] text-xl mb-4 italic text-center">A Regência de Marte e o Ocultismo</h3>
          <p className="leading-8 text-justify">
            O metal <strong>Ferro</strong> e o <strong>Anjo Samael</strong> guiam sua força de ação este mês. 
            No estudo do ocultismo, a sombra de Marte manifesta-se como impulsividade. 
            Reflita: sua cor de poder, o <strong>Vermelho Carmesim</strong>, deve ser usada para focar sua vontade, não para destruir pontes.
          </p>
        </section>

        <div className="text-center">
          <button className="bg-[#D4AF37] text-black px-10 py-4 font-black rounded-sm hover:bg-amber-500 transition-all shadow-lg shadow-amber-500/10 uppercase text-xs">
            Visualizar meu Ciclo de 30 Dias (R$ 47,90)
          </button>
        </div>
      </main>
    </div>
  );
}