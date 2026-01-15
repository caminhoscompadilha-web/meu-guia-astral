'use client';
import React, { useState } from 'react';
import { generateAstrologicalChart, type ChartGenerationInput } from '@/app/actions';
import type { InterpretNatalChartOutput } from '@/ai/flows/interpret-natal-chart';
import { LoadingAnimation } from '@/components/cosmic/loading-animation';

type Results = {
  interpretation: InterpretNatalChartOutput;
};

export default function PaginaDeTeste() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executarTeste = async () => {
    setLoading(true);
    setResultado(null);
    setError(null);
    
    try {
      const inputData: ChartGenerationInput = {
        birthDate: '1990-01-15',
        birthTime: '09:30',
        lat: -23.5505, // São Paulo
        lon: -46.6333,
        name: 'Viajante de Teste',
        lang: 'pt',
      };
      
      const chartResults = await generateAstrologicalChart(inputData);

      if (!chartResults.success || !chartResults.data) {
        throw new Error(chartResults.error || 'A resposta do servidor está incompleta.');
      }
      
      setResultado(chartResults.data);

    } catch (e: any) {
      console.error("Erro no painel de teste:", e);
      setError(e.message || 'Ocorreu um erro inesperado ao se conectar com o Oráculo.');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title: string, content: string | undefined) => (
    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800 transition-all duration-500 hover:border-purple-500/50">
      <h3 className="text-purple-400 font-bold mb-3">{title}</h3>
      <p className="leading-relaxed text-slate-300 whitespace-pre-line">{content || 'Aguardando análise...'}</p>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
       {loading && <LoadingAnimation message="Conectando com o Oráculo Sistêmico..." />}
      <header className="max-w-5xl mx-auto border-b border-purple-900/50 pb-6 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Oráculo Astral - Painel de Teste de Backend
        </h1>
        <p className="text-slate-400 mt-2">Ambiente de validação da Server Action, Efemérides e IA (Genkit).</p>
      </header>

      <main className="max-w-5xl mx-auto">
        {!resultado ? (
          <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 text-center">
            <h2 className="text-xl mb-4">Pronto para invocar o Oráculo?</h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Isso executará a chamada real para a `generateAstrologicalChart` Server Action, que calculará o mapa e invocará o Gemini.
            </p>
            <button 
              onClick={executarTeste}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? "Calculando Efemérides e Invocando IA..." : "Executar Teste Real"}
            </button>
             {error && (
                <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg">
                    <h3 className="font-bold">Erro na Conexão com o Oráculo</h3>
                    <p>{error}</p>
                </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-700">
            {renderSection("🔮 Resumo Filosófico (Sol, Lua, Ascendente)", resultado.interpretation.philosophicalSummary)}
            {renderSection("✨ Alma e Personalidade (Luz & Sombra)", resultado.interpretation.soulAndPersonality)}
            {renderSection("🧭 Eixo do Destino (Nodos Lunares)", resultado.interpretation.destinyAxis)}
            {renderSection("🪐 Ciclos Externos (Trânsitos Maiores)", resultado.interpretation.externalCycles)}
            {renderSection("🌍 Astrocartografia Mundial", resultado.interpretation.astrocartographyAnalysis)}
            {renderSection("🌙 Calendário Lunar", resultado.interpretation.lunarCalendar)}
            {renderSection("🃏 Tarot do Dia", resultado.interpretation.tarotOfTheDay)}
            
            <section className="bg-purple-900/10 p-6 rounded-xl border border-purple-500/20 text-center">
              <h3 className="text-purple-300 font-bold mb-3">🧘‍♀️ Reflexão Arquétipica</h3>
              <p className="leading-relaxed text-slate-300 text-lg italic">"{resultado.interpretation.archetypalReflection}"</p>
            </section>
            
            <div className="text-center pt-4">
                <button 
                onClick={() => setResultado(null)}
                className="text-slate-500 underline text-sm hover:text-slate-300"
                >
                Limpar e Novo Teste
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
