'use client';
import React, { useState } from 'react';

export default function PaginaDeTeste() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const executarTeste = async () => {
    setLoading(true);
    
    // Simulação de chamada para o nosso motor (Engine + IA)
    // Em um cenário real, aqui chamamos a Server Action
    setTimeout(() => {
      const mockDados = {
        perfil: "Nascimento em São Paulo, 15/01/1990",
        trindade: { sol: "Capricórnio ♑", lua: "Virgem ♍", as: "Touro ♉" },
        nodos: { norte: "Aquário (Missão)", sul: "Leão (Sombra)" },
        astrocartografia: [
          { local: "Europa Ocidental", linha: "Vênus (Luz)", info: "Prosperidade e Amor" },
          { local: "Sudeste Asiático", linha: "Saturno (Sombra)", info: "Desafios e Estrutura" }
        ],
        tarot: { carta: "O Mago", conselho: "Você tem todas as ferramentas para manifestar seu desejo hoje." },
        ia_analise: "Sua essência capricorniana busca estrutura, enquanto sua missão em Aquário pede inovação. Hoje, o trânsito da Lua ativa sua área de comunicação..."
      };
      setResultado(mockDados);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <header className="max-w-4xl mx-auto border-b border-purple-900/50 pb-6 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Oráculo Astral - Painel de Teste Local
        </h1>
        <p className="text-slate-400 mt-2">Ambiente de validação (100% Gratuito - Sem Firebase)</p>
      </header>

      <main className="max-w-4xl mx-auto">
        {!resultado ? (
          <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 text-center">
            <h2 className="text-xl mb-4">Pronto para calcular seu destino?</h2>
            <button 
              onClick={executarTeste}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50"
            >
              {loading ? "Calculando Efemérides..." : "Gerar Mapa de Teste"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
            {/* Bloco Sol/Lua/Asc */}
            <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-purple-400 font-bold mb-3">Resumo Filosófico</h3>
              <div className="space-y-2">
                <p>🌞 Sol: {resultado.trindade.sol}</p>
                <p>🌙 Lua: {resultado.trindade.lua}</p>
                <p>⬆️ Ascendente: {resultado.trindade.as}</p>
              </div>
            </section>

            {/* Bloco Tarot */}
            <section className="bg-slate-900 p-6 rounded-xl border border-pink-900/30">
              <h3 className="text-pink-400 font-bold mb-3">Tarot do Dia</h3>
              <p className="text-lg font-serif">🃏 {resultado.tarot.carta}</p>
              <p className="text-sm text-slate-400 mt-2 italic">"{resultado.tarot.conselho}"</p>
            </section>

            {/* Bloco Astrocartografia */}
            <section className="bg-slate-900 p-6 rounded-xl border border-slate-800 md:col-span-2">
              <h3 className="text-blue-400 font-bold mb-3">📍 Astrocartografia (Probabilidades Mundiais)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resultado.astrocartografia.map((item: any, i: number) => (
                  <div key={i} className="bg-slate-950 p-4 rounded border border-slate-800">
                    <span className={`text-xs font-bold uppercase ${item.linha.includes('Luz') ? 'text-green-400' : 'text-red-400'}`}>
                      {item.linha}
                    </span>
                    <p className="font-bold">{item.local}</p>
                    <p className="text-sm text-slate-400">{item.info}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bloco Análise IA */}
            <section className="bg-purple-900/10 p-6 rounded-xl border border-purple-500/20 md:col-span-2">
              <h3 className="text-purple-300 font-bold mb-3">Interpretador de Sombras e Luz (IA)</h3>
              <p className="leading-relaxed text-slate-300">{resultado.ia_analise}</p>
            </section>

            <button 
              onClick={() => setResultado(null)}
              className="text-slate-500 underline text-sm hover:text-slate-300"
            >
              Limpar e Novo Teste
            </button>
          </div>
        )}
      </main>
    </div>
  );
}