import React from 'react';

export default function DashboardAstral() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#cbd5e1] font-serif p-4 md:p-10">
      {/* HEADER DE PRESTÍGIO */}
      <header className="max-w-6xl mx-auto text-center border-b border-amber-900/30 pb-10 mb-10">
        <h1 className="text-[#D4AF37] text-xs tracking-[0.6em] uppercase mb-4">Portal Meu Guia Astral</h1>
        <h2 className="text-4xl text-white font-light">Seu Ciclo de 30 Dias</h2>
        <p className="mt-4 text-slate-500 italic text-sm">Uma jornada de autoconhecimento através das estrelas e do ocultismo.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUNA: MITOLOGIA E OCULTISMO (O CONTEÚDO DENSO) */}
        <section className="md:col-span-2 space-y-8">
          <div className="bg-[#0a0a0a] border border-amber-900/20 p-8 rounded-sm shadow-2xl">
            <h3 className="text-[#D4AF37] uppercase text-[10px] tracking-widest mb-2 font-bold">Regência Primordial</h3>
            <h4 className="text-2xl text-white mb-6">A Força de Marte: Do Metal ao Espírito</h4>
            
            <div className="prose prose-invert max-w-none text-slate-400 leading-8 text-justify">
              <p>
                Marte, conhecido na mitologia grega como Ares, não é apenas o senhor da guerra, mas a representação da vontade bruta que impulsiona a existência. No ocultismo, esta força é regida pelo metal <strong>Ferro</strong> e pelo <strong>Anjo Samael</strong>. 
              </p>
              <p>
                Este mês, o Ferro em sua alma está sendo forjado. Reflita: onde sua iniciativa tem sido construção e onde tem sido destruição cega? A sombra de Marte manifesta-se como a pressa que atropela o destino. Sua cor de poder para este ciclo é o <strong>Vermelho Carmesim</strong>.
              </p>
            </div>
          </div>

          {/* ÁREA DE SOLUÇÕES (TRABALHO, AMOR, SAÚDE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-lg">
                <span className="text-blue-400 text-[10px] uppercase font-bold tracking-tighter">Solução: Trabalho</span>
                <p className="mt-2 text-sm">Não inicie contratos em terças-feiras de Lua Minguante. Use o metal ferro como amuleto na mesa.</p>
             </div>
             <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-lg">
                <span className="text-pink-400 text-[10px] uppercase font-bold tracking-tighter">Solução: Amor</span>
                <p className="mt-2 text-sm">Momento de silenciar o ego. O anjo regente pede paciência na comunicação afetiva.</p>
             </div>
          </div>
        </section>

        {/* COLUNA LATERAL: DADOS TÉCNICOS E DOWNLOAD */}
        <aside className="space-y-6">
          <div className="bg-amber-900/5 border border-amber-900/20 p-6 rounded-lg text-center">
            <h5 className="text-[#D4AF37] text-xs uppercase mb-4 font-bold">Dossiê de Ciclo</h5>
            <button className="w-full py-4 bg-[#D4AF37] text-black font-black text-xs rounded-sm hover:bg-amber-500 transition-all">
              BAIXAR DOSSIÊ PDF
            </button>
          </div>

          <div className="bg-black/50 p-6 rounded-lg border border-slate-800">
            <h5 className="text-slate-500 text-[10px] uppercase mb-4">Suas Marés Astrais</h5>
            <ul className="text-xs space-y-4">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Sol</span> <span className="text-white">Áries</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Dia de Poder</span> <span className="text-white">Terça-feira</span>
              </li>
              <li className="flex justify-between">
                <span>Cor</span> <span className="text-white">Vermelho Carmesim</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
