'use client';
import React, { useState } from 'react';
import { generateAstrologicalChart, type ChartGenerationInput } from '@/app/actions';
import type { InterpretNatalChartOutput } from '@/ai/flows/interpret-natal-chart';
import { LoadingAnimation } from '@/components/cosmic/loading-animation';
import { salvarConsulta } from '@/lib/storage';
import type { TarotCard } from '@/lib/tarot';

type Results = {
  interpretation: InterpretNatalChartOutput;
  chartData: {
    name: string;
    positions: any[];
  };
  tarot: TarotCard;
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
      salvarConsulta(chartResults.data);

    } catch (e: any) {
      console.error("Erro no painel de teste:", e);
      setError(e.message || 'Ocorreu um erro inesperado ao se conectar com o Oráculo.');
    } finally {
      setLoading(false);
    }
  };

  const renderPilarSection = (title: string, analise: string | undefined, solucao: string | undefined) => (
    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800 transition-all duration-500 hover:border-purple-500/50">
      <h3 className="text-purple-400 font-bold mb-3">{title}</h3>
      <div className="space-y-4">
        <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Análise</h4>
            <p className="leading-relaxed text-slate-300 whitespace-pre-line">{analise || 'Aguardando análise...'}</p>
        </div>
        <div className="border-t border-slate-700 my-4"></div>
        <div>
            <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider">Solução Estratégica</h4>
            <p className="leading-relaxed text-slate-300 whitespace-pre-line">{solucao || 'Aguardando solução...'}</p>
        </div>
      </div>
    </section>
  );
  
  const renderSection = (title: string, content: string | undefined) => (
    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800 transition-all duration-500 hover:border-purple-500/50">
      <h3 className="text-purple-400 font-bold mb-3">{title}</h3>
      <p className="leading-relaxed text-slate-300 whitespace-pre-line">{content || 'Aguardando análise...'}</p>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
       {loading && <LoadingAnimation message="Conectando com o Oráculo Estratégico..." />}
      <header className="max-w-5xl mx-auto border-b border-purple-900/50 pb-6 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Oráculo Astral - Painel de Teste de Backend
        </h1>
        <p className="text-slate-400 mt-2">Ambiente de validação da Server Action, Efemérides e IA (Genkit com Estrategista Astral).</p>
      </header>

      <main className="max-w-5xl mx-auto">
        {!resultado ? (
          <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 text-center">
            <h2 className="text-xl mb-4">Pronto para invocar o Estrategista?</h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Isso executará a chamada real para a `generateAstrologicalChart` Server Action, que calculará o mapa e invocará o Gemini com o novo prompt de 6 pilares.
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
            {renderSection("🌟 Perfil do Mês", resultado.interpretation.perfil_do_mes)}
            
            <h2 className="text-2xl font-bold text-center text-slate-300 pt-4">Pilares Estratégicos</h2>
            {renderPilarSection("💼 Trabalho & Finanças", resultado.interpretation.pilares.trabalho_e_financas.analise, resultado.interpretation.pilares.trabalho_e_financas.solucao)}
            {renderPilarSection("❤️ Amor & Relacionamentos", resultado.interpretation.pilares.amor_e_relacionamentos.analise, resultado.interpretation.pilares.amor_e_relacionamentos.solucao)}
            {renderPilarSection("🌿 Saúde & Vitalidade", resultado.interpretation.pilares.saude_e_vitalidade.analise, resultado.interpretation.pilares.saude_e_vitalidade.solucao)}
            {renderPilarSection("🧘 Reflexão & Espiritualidade", resultado.interpretation.pilares.reflexao_e_espiritualidade.analise, resultado.interpretation.pilares.reflexao_e_espiritualidade.solucao)}

            <h2 className="text-2xl font-bold text-center text-slate-300 pt-4">Fases de Execução</h2>
            {renderSection("⏸️ Revisão (Pausar/Reavaliar)", resultado.interpretation.fases_de_execucao.revisao)}
            {renderSection("🚀 Ação (Força Total)", resultado.interpretation.fases_de_execucao.acao)}

            <h2 className="text-2xl font-bold text-center text-slate-300 pt-4">Alertas Geográficos</h2>
            {renderSection("⚠️ Alerta Geográfico de Sombra", resultado.interpretation.alerta_geografico_sombra)}
            {renderSection("✨ Alerta Geográfico de Luz", resultado.interpretation.alerta_geografico_luz)}
            
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
