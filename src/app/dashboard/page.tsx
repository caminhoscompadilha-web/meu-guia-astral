
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { translations } from '@/lib/translations'; 
import { obterUltimaConsulta } from '@/lib/storage';
import { ModalPagamento } from '@/components/ModalPagamento';
import { GradePremium } from '@/components/GradePremium';
import { WidgetCicloLunar } from '@/components/WidgetCicloLunar';

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
      const userLang = parsedData.idioma || 'pt';
      setLang(userLang);
      
      if (translations[userLang]) {
        setT(translations[userLang]);
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
      perfil_do_mes: "Este é um mês de profunda reavaliação interna, onde a sua estrutura capricorniana será desafiada a encontrar novas formas de expressão emocional, impulsionada pela sua Lua em Escorpião. O Ascendente em Leão pede que você lidere essa mudança com coragem e autenticidade, transformando antigos medos em poder pessoal.",
      ciclo_lunar: {
        analise: "A Lua Crescente em Touro ativa a sua Casa 4, pedindo foco no lar e na segurança emocional. Como o arquétipo de Hécate, que guarda as encruzilhadas, é tempo de olhar para as fundações da sua vida e decidir que caminho nutre a sua alma. A energia é de construção lenta e sólida, não de impulsos.",
        solucao: "Priorize organizar seu espaço físico e passar tempo de qualidade com a família. No campo material, é um excelente momento para plantar as sementes de um novo projeto financeiro, mas evite decisões de alto risco. A energia lunar favorece o crescimento estável."
      },
      pilares: {
          trabalho_e_financas: {
              analise: "Com Saturno em trânsito pela sua casa 2, a prudência financeira é a chave mestra. Este não é um período para gastos extravagantes, mas sim para construir uma estrutura sólida e duradoura. Você sentirá uma pressão para reavaliar o que realmente tem valor para si, e como o seu trabalho reflete isso. A energia é de um mestre construtor que verifica cada viga antes de subir um novo andar.",
              solucao: "Ação Estratégica: Crie um 'Orçamento de Guerra' para os próximos 3 meses, cortando despesas supérfluas e direcionando capital para um fundo de emergência ou investimento de baixo risco. No trabalho, foque em entregar resultados impecáveis em vez de iniciar novos projetos. A sua reputação de confiança será o seu maior ativo."
          },
          amor_e_relacionamentos: {
              analise: "Vênus, a deusa do amor e da beleza, transita a sua casa 7, trazendo uma aura de harmonia e diplomacia para as suas parcerias. No entanto, a sua presença aqui exige autenticidade. Relações superficiais ou baseadas em conveniência não se sustentarão. A beleza que Vênus procura é a da verdade e do compromisso mútuo.",
              solucao: "Se está num relacionamento, agende uma conversa honesta e vulnerável com o seu parceiro sobre metas e valores de longo prazo. Se solteiro, o exercício é interno: escreva uma lista detalhada do que você 'requer' e do que você 'oferece' numa parceria. A clareza interna atrairá a pessoa certa."
          },
          saude_e_vitalidade: {
              analise: "Marte, o deus da guerra e da ação, energiza a sua casa 6, a casa da rotina e da saúde. Isso pode manifestar-se como um excesso de energia mental, levando a stress, ansiedade e um risco real de burnout. A sua mente estará a 200km/h, mas o seu corpo pode não aguentar o ritmo. A energia de Ares aqui pode ser destrutiva se não for canalizada.",
              solucao: "Biohacking Astral: Canalize a energia marciana através de atividades físicas de alta intensidade (HIIT ou corrida) 3 vezes por semana, preferencialmente pela manhã. À noite, pratique o 'shutdown mental': desligue todos os ecrãs 1 hora antes de dormir e leia um livro de ficção para acalmar o cérebro. O metal de Marte é o Ferro; certifique-se de que a sua dieta é rica neste mineral."
          },
          reflexao_e_espiritualidade: {
              analise: "Netuno, o senhor dos oceanos e do inconsciente, aprofunda a sua intuição ao transitar a sua casa 12. Os véus entre os mundos estarão mais finos, e os seus sonhos, mais vívidos e proféticos. No entanto, a sombra de Netuno é a confusão, o escapismo e a autoilusão. Sentirá uma vontade de 'fugir' da realidade.",
              solucao: "Tema de Meditação: Mantenha um 'Diário de Sonhos' ao lado da sua cama. Ao acordar, anote tudo o que se lembrar. Medite por 10 minutos todas as manhãs sobre o tema 'Clareza em meio ao nevoeiro' ou 'Deixar ir o que não posso controlar'. A sua bússola interna está a ser recalibrada; o silêncio é o seu melhor guia."
          }
      },
      fases_de_execucao: {
          revisao: "PAUSE qualquer novo projeto de grande escala ou parceria comercial. O momento é de reavaliar as fundações do que já foi construído. Analise contratos existentes, renegocie termos se necessário, e, acima de tudo, identifique e corte atividades ou relações que estão a drenar a sua energia vital sem retorno.",
          acao: "COLOQUE FORÇA TOTAL na sua saúde física e mental. A disciplina que você implementar agora no seu bem-estar será o combustível para a expansão profissional e financeira que se aproxima no próximo ciclo lunar. Invista em terapia, exercício, alimentação e sono. Este é o seu 'treino de guerreiro' para a batalha que virá."
      },
      alerta_geografico_sombra: "No estudo do ocultismo, cada planeta projeta uma sombra quando a sua energia é mal canalizada. Para o seu ciclo atual, a influência de Saturno na sua localização atual ressoa com a energia do demônio da Goécia, Asmodeus, que rege a avareza e os bloqueios materiais. Não veja isto como uma maldição, mas como o 'Chumbo' que a sua Alquimia pessoal deve transformar em Ouro. O metal de Saturno é o Chumbo, denso e pesado, simbolizando os fardos e as responsabilidades que você pode estar a sentir. O desafio é não sucumbir ao pessimismo ou à sensação de que 'nada avança'. A sombra de Saturno/Asmodeus manifesta-se como medo da escassez, o que pode levar a decisões financeiras baseadas no pânico, ou a uma rigidez que impede o fluxo da prosperidade. É o arquétipo do 'velho rei' que se recusa a morrer para que o novo possa nascer.",
      alerta_geografico_luz: "O ponto de sorte na sua localização atual está sob a influência direta de Júpiter, o Grande Benéfico. Na hierarquia angelical, esta energia corresponde ao Arcanjo Sachiel, o anjo da abundância, da expansão e da caridade. O seu metal é o Estanho, flexível e protetor. Esta é a sua 'carta na manga' para este ciclo. A energia de Júpiter/Sachiel abre portas para o networking, para parcerias benéficas e para oportunidades de aprendizado que podem levar a um ganho financeiro inesperado. Aja com generosidade e otimismo, e o universo responderá na mesma moeda. O dia da semana para agir é a Quinta-feira. Use a cor azul real para atrair estas vibrações."
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

        <div className="mb-10">
          <WidgetCicloLunar 
            fase={iaData.ciclo_lunar.analise.split(' em ')[0]} // Simples extração para exemplo
            signo={iaData.ciclo_lunar.analise.split(' em ')[1]?.split(' ')[0] || 'Áries'}
            conselho={iaData.ciclo_lunar.solucao}
          />
        </div>

        <GradePremium dataIA={iaData} pago={pago} aoClicar={() => setModalAberto(true)} />

      </main>
    </div>
  );
}
