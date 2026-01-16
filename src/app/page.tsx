'import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-noite-profunda text-white p-4">
      <section className="bg-noite-profunda p-8 border border-dourado-luxo/30 rounded-lg shadow-2xl max-w-4xl mx-auto">
        <h1 className="titulo-mistico text-2xl text-center mb-8 text-dourado-luxo">
          O universo não fala por coincidências, mas por sinais. <br/>
          Descubra a mensagem que o Céu e as Energias têm para você.
        </h1>

        <div className="bg-black/40 border border-dourado-luxo/20 p-8 rounded-xl shadow-2xl">
          <h2 className="titulo-mistico text-xl mb-6 text-center text-dourado-luxo">Organizar o Céu de Nascimento</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-dourado-luxo text-xs uppercase mb-1">Cidade e Estado</label>
              <input type="text" placeholder="Ex: Belo Horizonte, MG" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-dourado-luxo text-xs uppercase mb-1">Data</label>
                <input type="date" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white" />
              </div>
              <div>
                <label className="block text-dourado-luxo text-xs uppercase mb-1">Hora Exata (24h)</label>
                <input type="time" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-roxo-místico/10 border border-roxo-místico/30 rounded text-left">
              <input type="checkbox" className="mt-1" id="nao-sei-hora" />
              <label htmlFor="nao-sei-hora" className="text-xs text-gray-400">
                Não sei o meu horário de nascimento. <br/>
                <span className="text-dourado-luxo/70 font-bold italic">
                  * O sistema assumirá 12:00h e gerará um Mapa de Essência (Casas estimadas).
                </span>
              </label>
            </div>

            <button type="button" className="w-full mt-4 py-4 font-bold tracking-widest border border-dourado-luxo text-dourado-luxo hover:bg-dourado-luxo hover:text-black transition-all">
              GERAR MAPA DE CONSCIÊNCIA
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}