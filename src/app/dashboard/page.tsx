
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { translations } from '@/lib/translations'; 
import { obterUltimaConsulta } from '@/lib/storage';
import MapaAstral from '@/components/MapaAstral';

export default function DashboardGuia() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [t, setT] = useState(translations.pt); 
  const [ultimaConsulta, setUltimaConsulta] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('user_astral_data');
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      
      if (translations[parsedData.idioma]) {
        setT(translations[parsedData.idioma]);
      }
    }
    
    const passado = obterUltimaConsulta();
    if (passado) {
      setUltimaConsulta(passado);
    }
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock de dados para a IA enquanto a API não está conectada
  const mockIAData = {
      analise_psicologica: "Sua essência capricorniana busca estrutura e segurança, mas sua Lua em Escorpião anseia por profundidade emocional. O Ascendente em Leão te dá uma máscara de confiança e carisma, mas por dentro, a batalha entre o dever e o desejo é constante.",
      missao_vida: "Seu Nodo Norte em Peixes te chama para transcender o perfeccionismo virginiano (Nodo Sul). Sua missão é aprender a fluir, a confiar na intuição e a desenvolver a compaixão universal, saindo da lógica estrita para abraçar o mistério.",
      alertas_astrocartografia: [
          { tipo: "Luz/Prosperidade", local: "Europa Meridional (Linha de Vênus)", detalhe: "Relacionamentos, parcerias e ganhos financeiros são favorecidos aqui. Ótimo para networking ou encontrar harmonia." },
          { tipo: "Sombra/Perigo", local: "América do Norte (Linha de Saturno)", detalhe: "Espere desafios estruturais e a necessidade de disciplina. Remédio: Encare como uma chance de construir resiliência e não como punição." }
      ],
      conselho_tarot: "A carta do Eremita, combinada com o trânsito de Saturno, pede um retiro estratégico. As respostas que você busca para sua carreira não estão no barulho externo, mas no silêncio da sua própria sabedoria. Medite antes de agir.",
      probabilidades_30_dias: "Plutão continua a transformar sua casa das parcerias, exigindo autenticidade total ou o fim de ciclos. A Lua Nova no seu setor financeiro no dia 15 trará uma oportunidade inesperada de ganho. Esteja atento."
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
        <p className="text-purple-300 font-serif animate-pulse">Consultando as efemérides e o oráculo...</p>
      </div>
    );
  }

  const iaData = mockIAData; // Em um cenário real, isso viria do estado após a chamada da API

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-2">{t.welcome}, {userData?.nome || 'Explorador'}</h2>
          <p className="text-slate-400">{t.subtitle}</p>
        </header>

        {ultimaConsulta && (
          <div className="mb-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-2xl animate-in slide-in-from-top-5 duration-700">
            <p className="text-sm text-purple-300">
              ✨ <strong>Memória do Guia:</strong> Na tua última visita ({new Date(ultimaConsulta.dataConsulta).toLocaleDateString()}), 
              a tua carta foi <strong>{ultimaConsulta.tarot.name}</strong>. 
              Vejamos como as energias evoluíram para este novo ciclo de 30 dias.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm md:col-span-2">
            <h3 className="text-purple-400 uppercase text-xs font-bold tracking-widest mb-6">{t.essencia}</h3>
            <p className="text-lg leading-relaxed text-slate-300 font-serif">
              {iaData.analise_psicologica}
            </p>
          </section>

          <section className="bg-gradient-to-b from-indigo-900/20 to-slate-900/40 border border-indigo-500/20 p-6 rounded-3xl">
            <h3 className="text-indigo-400 uppercase text-xs font-bold tracking-widest mb-6">{t.tarot}</h3>
            <div className="text-center">
               <div className="w-24 h-40 bg-indigo-950 border-2 border-indigo-400/50 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                 <span className="text-4xl">🔮</span>
              </div>
              <p className="text-sm text-slate-300 italic">"{iaData.conselho_tarot}"</p>
            </div>
          </section>
          
          <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl md:col-span-3">
            <h3 className="text-amber-400 uppercase text-xs font-bold tracking-widest mb-6">{t.missao}</h3>
            <p className="text-base leading-relaxed text-slate-300 font-serif">
                {iaData.missao_vida}
            </p>
          </section>

          <section className="md:col-span-3 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-blue-400 uppercase text-xs font-bold tracking-widest mb-6">{t.astro}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {iaData.alertas_astrocartografia.map((alerta, index) => (
                  <div key={index} className={`p-4 rounded-2xl border ${
                    alerta.tipo === 'Sombra/Perigo' 
                      ? 'bg-red-900/20 border-red-500/40' 
                      : 'bg-green-900/20 border-green-500/40'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl ${alerta.tipo === 'Sombra/Perigo' ? 'text-red-400' : 'text-green-400'}`}>
                        {alerta.tipo === 'Sombra/Perigo' ? '⚠️' : '✨'}
                      </span>
                      <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {alerta.tipo}
                          </p>
                          <p className="font-bold text-slate-200">{alerta.local}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 pl-1">{alerta.detalhe}</p>
                  </div>
                ))}
              </div>
              <MapaAstral linhas={[]} />
            </div>
          </section>

          <section className="md:col-span-3 bg-gradient-to-r from-purple-900/10 to-blue-900/10 border border-purple-500/20 p-8 rounded-3xl">
            <h3 className="text-purple-300 uppercase text-xs font-bold tracking-widest mb-6">{t.oraculo} - Próximos 30 dias</h3>
            <p className="text-lg leading-relaxed text-slate-300 font-serif">
               {iaData.probabilidades_30_dias}
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
