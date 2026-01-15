
'use client';

import { BloqueioPremium } from './BloqueioPremium';

export function GradePremium({ dataIA, pago, aoClicar }: { dataIA: any, pago: boolean, aoClicar: () => void }) {
  if (!dataIA || !dataIA.pilares) return null;

  return (
    <div id="grade-premium-conteudo" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      
      {/* Bloco: Trabalho e Finanças */}
      <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-md relative transition-all hover:border-purple-500/50">
        <BloqueioPremium pago={pago} aoClicar={aoClicar} />
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💼</span>
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Trabalho & Finanças</h3>
        </div>
        <p className="text-slate-400 text-sm mb-4">{dataIA.pilares.trabalho_e_financas.analise}</p>
        <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
          <p className="text-xs font-bold text-purple-400 mb-1">Solução Estratégica:</p>
          <p className="text-xs text-purple-200 italic">{dataIA.pilares.trabalho_e_financas.solucao}</p>
        </div>
      </section>

      {/* Bloco: Amor e Relacionamentos */}
      <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-md relative transition-all hover:border-pink-500/50">
        <BloqueioPremium pago={pago} aoClicar={aoClicar} />
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">❤️</span>
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Amor & Relações</h3>
        </div>
        <p className="text-slate-400 text-sm mb-4">{dataIA.pilares.amor_e_relacionamentos.analise}</p>
        <div className="bg-pink-500/10 p-3 rounded-xl border border-pink-500/20">
          <p className="text-xs font-bold text-pink-400 mb-1">Solução Estratégica:</p>
          <p className="text-xs text-pink-200 italic">{dataIA.pilares.amor_e_relacionamentos.solucao}</p>
        </div>
      </section>

      {/* Bloco: Saúde e Biohacking Astral */}
      <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-md relative transition-all hover:border-emerald-500/50">
        <BloqueioPremium pago={pago} aoClicar={aoClicar} />
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌱</span>
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Saúde & Vitalidade</h3>
        </div>
        <p className="text-slate-400 text-sm mb-4">{dataIA.pilares.saude_e_vitalidade.analise}</p>
        <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
          <p className="text-xs font-bold text-emerald-400 mb-1">Solução Estratégica (Biohacking Astral):</p>
          <p className="text-xs text-emerald-200 italic">{dataIA.pilares.saude_e_vitalidade.solucao}</p>
        </div>
      </section>

      {/* Bloco Grande: Revisão & Ação (O Plano de Batalha) */}
      <section className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-slate-900 to-blue-900/20 border border-blue-500/30 p-8 rounded-3xl relative transition-all hover:border-blue-400/50">
        <BloqueioPremium pago={pago} aoClicar={aoClicar} />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-4">🔄 Tempo de Revisão</h4>
            <p className="text-slate-200 leading-relaxed">{dataIA.fases_de_execucao.revisao}</p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-8 md:pt-0 md:pl-8">
            <h4 className="text-amber-400 font-black text-xs uppercase tracking-[0.3em] mb-4">⚡ Momento de Ação</h4>
            <p className="text-slate-200 leading-relaxed">{dataIA.fases_de_execucao.acao}</p>
          </div>
        </div>
      </section>

        {/* Alertas Geográficos */}
       <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-md relative transition-all hover:border-red-500/50 md:col-span-2">
         <BloqueioPremium pago={pago} aoClicar={aoClicar} />
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Alertas Geográficos</h3>
        </div>
        <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-xl">
                 <p className="text-xs font-bold text-red-400 mb-1">Ponto de Sombra (Risco):</p>
                 <p className="text-xs text-red-200">{dataIA.alerta_geografico_sombra}</p>
            </div>
             <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-xl">
                 <p className="text-xs font-bold text-green-400 mb-1">Ponto de Luz (Sorte):</p>
                 <p className="text-xs text-green-200">{dataIA.alerta_geografico_luz}</p>
            </div>
        </div>
      </section>

      {/* Bloco: Reflexão */}
       <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-md relative transition-all hover:border-indigo-500/50">
        <BloqueioPremium pago={pago} aoClicar={aoClicar} />
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧘</span>
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Reflexão & Espírito</h3>
        </div>
        <p className="text-slate-400 text-sm mb-4">{dataIA.pilares.reflexao_e_espiritualidade.analise}</p>
        <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
          <p className="text-xs font-bold text-indigo-400 mb-1">Tema de Meditação:</p>
          <p className="text-xs text-indigo-200 italic">{dataIA.pilares.reflexao_e_espiritualidade.solucao}</p>
        </div>
      </section>


    </div>
  );
}
