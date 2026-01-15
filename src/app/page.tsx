
"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { generateAstrologicalChart, type ChartGenerationInput } from '@/app/actions';
import { NatalChartDisplay } from '@/components/cosmic/natal-chart-display';
import { PlanetaryPositions } from '@/components/cosmic/planetary-positions';
import { InterpretationDisplay } from '@/components/cosmic/interpretation-display';
import { TransitAnalysisDisplay } from '@/components/cosmic/transit-analysis-display';
import { LoadingAnimation } from '@/components/cosmic/loading-animation';
import { NatalChartForm } from '@/components/cosmic/natal-chart-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import type { NatalChartData } from '@/lib/types';
import { Sparkles, Globe } from 'lucide-react';
import type { InterpretNatalChartOutput } from '@/ai/flows/interpret-natal-chart';
import { getTranslations, type Translations } from '@/lib/i18n';
import { Header } from '@/components/Header';
import type { FormData } from '@/components/cosmic/natal-chart-form';

type Results = {
  interpretation: InterpretNatalChartOutput;
  transits: InterpretNatalChartOutput;
  chartData: NatalChartData;
};

type Lang = 'pt' | 'en' | 'es' | 'it' | 'fr';

export default function Home() {
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [lang, setLang] = useState<Lang>('pt');
  const { toast } = useToast();

  useEffect(() => {
    async function loadTranslations() {
      const t = await getTranslations(lang);
      setTranslations(t);
    }
    loadTranslations();
  }, [lang]);

  const handleChartRequest = async (data: FormData) => {
    if (!translations) return;
    setIsLoading(true);
    setResults(null);
    try {
      
      const inputData: ChartGenerationInput = {
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        lat: -23.5505,
        lon: -46.6333,
        name: data.name || translations.ui.cosmicTraveler,
        lang: data.lang,
      };
      
      const chartResults = await generateAstrologicalChart(inputData);

      if (!chartResults.success || !chartResults.data) {
        throw new Error(chartResults.error || translations.errors.incompleteResponse);
      }
      
      // Salva os dados no localStorage para "lembrar" o usuário
      localStorage.setItem('meu-guia-user-data', JSON.stringify(inputData));

      setResults(chartResults.data);

    } catch (error: any) {
      console.error("Erro no cliente ao gerar mapa:", error);
      toast({
        variant: "destructive",
        title: translations.errors.chartGenerationTitle,
        description: error.message || translations.errors.unexpectedError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
  };
  
  useEffect(() => {
    // Tenta carregar dados do usuário do localStorage ao iniciar
    const savedData = localStorage.getItem('meu-guia-user-data');
    if (savedData) {
      // Futuramente, poderíamos usar esses dados para preencher o form
      // ou mostrar um resumo do último mapa gerado.
      console.log("Usuário já tem dados salvos:", JSON.parse(savedData));
    }
  }, []);

  if (!translations) {
      return <LoadingAnimation message="Carregando..." />;
  }

  if (isLoading) {
    return <LoadingAnimation message={translations.ui.loadingMessage} />;
  }

  if (results) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
        <Header />
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={handleReset} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> {translations.ui.backToForm}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
              <NatalChartDisplay 
                chartData={{...results.chartData, name: results.chartData.name || translations.ui.cosmicTraveler }}
                translations={translations}
              />
              <PlanetaryPositions 
                positions={results.chartData.positions}
                translations={translations}
              />
            </div>
            <div className="lg:col-span-2">
              <Tabs defaultValue="interpretation" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="interpretation">{translations.ui.personalAnalysis}</TabsTrigger>
                  <TabsTrigger value="transits">{translations.ui.dayOracle}</TabsTrigger>
                </TabsList>
                <TabsContent value="interpretation" className="mt-6">
                  <InterpretationDisplay 
                    interpretation={results.interpretation} 
                    translations={translations}
                  />
                </TabsContent>
                <TabsContent value="transits" className="mt-6">
                   <TransitAnalysisDisplay 
                    transits={results.transits} 
                    translations={translations}
                   />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-purple-500/30">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-purple-400 uppercase bg-purple-950/30 border border-purple-800/50 rounded-full">
          Seu destino escrito nas estrelas
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
          Descubra o seu <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Propósito Universal
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12">
          Uma jornada profunda através da Astrologia Psicológica, Astrocartografia e Tarot. 
          O <strong>Meu Guia Astrológico</strong> revela suas sombras, potencializa sua luz e orienta seus próximos 30 dias.
        </p>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
            <NatalChartForm onSubmit={handleChartRequest} disabled={isLoading} translations={translations} setLang={setLang} />
        </div>
      </main>
    </div>
  );
}
