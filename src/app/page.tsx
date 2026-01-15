
"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { generateAstrologicalChart, type ChartGenerationInput } from '@/app/actions';
import { NatalChartDisplay } from '@/components/cosmic/natal-chart-display';
import { PlanetaryPositions } from '@/components/cosmic/planetary-positions';
import { InterpretationDisplay } from '@/components/cosmic/interpretation-display';
import { TransitAnalysisDisplay } from '@/components/cosmic/transit-analysis-display';
import { LoadingAnimation } from '@/components/cosmic/loading-animation';
import { NatalChartForm, type FormData } from '@/components/cosmic/natal-chart-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import type { NatalChartData } from '@/lib/types';
import { Sparkles, Globe } from 'lucide-react';
import type { InterpretNatalChartOutput } from '@/ai/flows/interpret-natal-chart';
import { getTranslations, type Translations } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Results = {
  interpretation: InterpretNatalChartOutput;
  transits: InterpretNatalChartOutput; // Agora transits também contém a interpretação completa
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
      const birthDate = `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`;
      
      const inputData: ChartGenerationInput = {
        birthDate: birthDate,
        birthTime: data.birthTime,
        lat: -23.5505,
        lon: -46.6333,
        name: data.name || translations.ui.cosmicTraveler,
        lang: lang,
      };
      
      const chartResults = await generateAstrologicalChart(inputData);

      if (!chartResults.success || !chartResults.data) {
        throw new Error(chartResults.error || translations.errors.incompleteResponse);
      }
      
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
  
  if (!translations) {
      return <LoadingAnimation message="Carregando traduções..." />;
  }

  if (isLoading) {
    return <LoadingAnimation message={translations.ui.loadingMessage} />;
  }

  if (results) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden p-4">
       <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <Select value={lang} onValueChange={(value) => setLang(value as Lang)}>
            <SelectTrigger className="w-[120px] bg-muted/50 border-primary/20">
                <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
            </Select>
        </div>
       </div>
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary rounded-full filter blur-3xl"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="bg-primary/50 text-primary-foreground p-4 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500 mb-4">
          {translations.ui.mainTitle}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
          {translations.ui.subTitle}
        </p>
      </div>
      <div className="relative z-10 w-full max-w-2xl mt-8">
        <NatalChartForm onSubmit={handleChartRequest} disabled={isLoading} translations={translations} />
      </div>
    </div>
  );
}
