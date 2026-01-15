
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { translations } from '@/lib/translations'; 
import { obterUltimaConsulta } from '@/lib/storage';
import { ModalPagamento } from '@/components/ModalPagamento';
import { GradePremium } from '@/components/GradePremium';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function GerarDossiePDF({ dataIA, idioma }: { dataIA: any, idioma: string }) {
  const exportarPDF = async () => {
    const elemento = document.getElementById('grade-premium-conteudo');
    if (!elemento) return;

    const canvas = await html2canvas(elemento, {
      scale: 2,
      backgroundColor: '#050505', // Mantém o fundo Dark Mode no PDF
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    });
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const labels: any = {
      "pt": { titulo: "PORTAL MEU GUIA ASTRAL", sub: "DOSSIÊ EXCLUSIVO DO CICLO DE 30 DIAS" },
      "en": { titulo: "MY ASTRAL GUIDE PORTAL", sub: "EXCLUSIVE 30-DAY CYCLE DOSSIER" },
      "es": { titulo: "PORTAL MI GUÍA ASTRAL", sub: "DOSSIER EXCLUSIVO DEL CICLO DE 30 DÍAS" },
      "it": { titulo: "PORTALE LA MIA GUIDA ASTRALE", sub: "DOSSIER ESCLUSIVO DEL CICLO DI 30 GIORNI" },
      "fr": { titulo: "PORTAIL MON GUIDE ASTRAL", sub: "DOSSIER EXCLUSIF DU CYCLE DE 30 JOURS" }
    };

    const t = labels[idioma] || labels["pt"];

    pdf.setFillColor(5, 5, 5);
    pdf.rect(0, 0, 210, 297, 'F');
    pdf.setTextColor(212, 175, 55);
    pdf.setFont("times", "bold");
    pdf.text(t.titulo, 105, 15, { align: "center" });
    pdf.setFontSize(10);
    pdf.text(t.sub, 105, 22, { align: "center" });

    pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);
    pdf.save(`Dossie_Astral_${dataIA.nome}_Ciclo.pdf`);
  };

  return (
    <button 
      onClick={exportarPDF}
      className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black px-6 py-3 rounded-full hover:scale-105 transition-all shadow-xl shadow-amber-500/20"
    >
      <span>📥</span> BAIXAR MEU DOSSIÊ DE CICLO (PDF)
    </button>
  );
} 

export default function DashboardGuia() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [t, setT] = useState(translations.pt); 
  const [lang, setLang] = useState('pt');
  const [ultimaConsulta, setUltimaConsulta] = useState<any>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [pago] = useState(false); // Simulação de status de pagamento

  useEffect(() => {
    const data = localStorage.getItem('user_astral_data');
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setLang(parsedData.idioma);
      
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

  const iaData = ultimaConsulta?.interpretation || {
      perfil_do_mes: "Este é um mês de profunda reavaliação interna, onde a sua estrutura capricorniana será desafiada a encontrar novas formas de expressão emocional, impulsionada pela sua Lua em Escorpião. O Ascendente em Leão pede que você lidere essa mudança com coragem.",
      pilares: {
          trabalho_e_financas: {
              analise: "Com Saturno em trânsito pela sua casa 2, a prudência financeira é crucial. Espere uma reestruturação na forma como você gera valor.",
              solucao: "Revise todos os seus investimentos e crie um orçamento de 3 meses. Evite grandes compras por impulso até a próxima Lua Nova."
          },
          amor_e_relacionamentos: {
              analise: "Vênus transita sua casa 7, trazendo harmonia, mas também a necessidade de clareza em parcerias. Relações superficiais não se sustentarão.",
              solucao: "Agende uma conversa honesta com seu parceiro sobre metas de longo prazo. Se solteiro, foque em definir o que você realmente busca."
          },
          saude_e_vitalidade: {
              analise: "Marte em sua casa 6 sugere um excesso de energia mental que pode levar ao estresse. O risco de burnout é real.",
              solucao: "Canalize a energia através de atividades físicas de alta intensidade (HIIT) 3x por semana. Desconecte de telas 1 hora antes de dormir."
          },
          reflexao_e_espiritualidade: {
              analise: "Netuno na sua casa 12 aprofunda sua intuição, mas pode também trazer confusão e escapismo. Seus sonhos estarão mais vívidos.",
              solucao: "Mantenha um diário de sonhos. Medite por 10 minutos todas as manhãs sobre o tema 'deixar ir o que não posso controlar'."
          }
      },
      fases_de_execucao: {
          revisao: "PAUSE qualquer novo projeto de grande escala. O momento é de reavaliar as fundações do que já foi construído, especialmente na sua carreira. Analise o que está a drenar sua energia.",
          acao: "COLOQUE FORÇA TOTAL na sua saúde física e mental. A disciplina que você implementar agora no seu bem-estar será o combustível para a expansão que virá no próximo ciclo."
      },
      alerta_geografico_sombra: "Risco de perdas financeiras e atrasos em projetos na sua localização atual devido a uma linha de Saturno.",
      alerta_geografico_luz: "Oportunidades de networking e parcerias benéficas podem surgir em viagens para a Europa Ocidental (Linha de Vênus)."
  };
  const nomeUsuario = ultimaConsulta?.chartData?.name || 'Viajante Cósmico';


  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
        <p className="text-purple-300 font-serif animate-pulse">Consultando as efemérides e o oráculo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body">
      <Header />
      <ModalPagamento aberto={modalAberto} aoFechar={() => setModalAberto(false)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Seu Plano de Ciclo de 30 Dias
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">{iaData.perfil_do_mes}</p>
        </header>

        {ultimaConsulta && ultimaConsulta.dataConsulta && (
          <div className="mb-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-2xl animate-in slide-in-from-top-5 duration-700 max-w-3xl mx-auto">
            <p className="text-sm text-purple-300 text-center">
              ✨ <strong>Memória do Guia:</strong> Na tua última visita ({new Date(ultimaConsulta.dataConsulta).toLocaleDateString()}), 
              a tua carta foi <strong>{ultimaConsulta.tarot.name}</strong>. 
              Vejamos como as energias evoluíram para este novo ciclo.
            </p>
          </div>
        )}

        <GradePremium dataIA={iaData} pago={pago} aoClicar={() => setModalAberto(true)} />

        <div className="mt-12 flex justify-center">
          <GerarDossiePDF dataIA={{...iaData, nome: nomeUsuario}} idioma={lang} />
        </div>

      </main>
    </div>
  );
}
