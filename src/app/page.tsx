"use client";

import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { NatalChartForm, type FormData } from '@/components/cosmic/natal-chart-form';
import type { InterpretNatalChartOutput } from '@/ai/flows/interpret-natal-chart';
import { interpretNatalChart } from '@/ai/flows/interpret-natal-chart';
import type { AnalyzePlanetaryTransitsOutput } from '@/ai/flows/analyze-planetary-transits';
import { analyzePlanetaryTransits } from '@/ai/flows/analyze-planetary-transits';
import { NatalChartDisplay } from '@/components/cosmic/natal-chart-display';
import { PlanetaryPositions, type PlanetPosition } from '@/components/cosmic/planetary-positions';
import { InterpretationDisplay } from '@/components/cosmic/interpretation-display';
import { TransitAnalysisDisplay } from '@/components/cosmic/transit-analysis-display';
import { LoadingAnimation } from '@/components/cosmic/loading-animation';
import { ZODIAC_SIGNS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import type { NatalChartData } from '@/lib/types';
import { Sparkles } from 'lucide-react';

type Results = {
  interpretation: InterpretNatalChartOutput;
  transits: AnalyzePlanetaryTransitsOutput;
  chartData: NatalChartData;
};

export default function Home() {
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mockPlanetaryPositions = (birthDate: Date): PlanetPosition[] => {
    const planets = ['Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão', 'Ascendente'];
    const dayOfYear = (Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate()) - Date.UTC(birthDate.getUTCFullYear(), 0, 0)) / 86400000;

    return planets.map((planet, index) => {
        const signIndex = (Math.floor(dayOfYear / 15) + index * 2) % 12;
        const house = (parseInt(birthDate.toTimeString().substring(0,2)) + index * 3) % 12 + 1;
        return {
            planet: planet as PlanetPosition['planet'],
            sign: ZODIAC_SIGNS[signIndex],
            house: house,
        };
    });
  };

  const handleChartRequest = async (data: FormData) => {
    setIsLoading(true);
    setResults(null);
    try {
      const birthDateObj = new Date(`${data.birthDate}T${data.birthTime}`);
      
      const [interpretation, transits] = await Promise.all([
        interpretNatalChart({
          birthDate: data.birthDate,
          birthTime: data.birthTime,
          birthLocation: data.birthLocation,
          sunSign: data.sunSign,
          moonSign: data.moonSign,
          risingSign: data.risingSign,
        }),
        analyzePlanetaryTransits({
          natalChartData: JSON.stringify(data),
          currentDate: new Date().toISOString().split('T')[0],
        })
      ]);

      const positions = mockPlanetaryPositions(birthDateObj);

      setResults({ 
        interpretation, 
        transits,
        chartData: {
          name: data.name,
          positions,
        }
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao Gerar o Mapa",
        description: "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (results) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={handleReset} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao formulário
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
              <NatalChartDisplay chartData={results.chartData} />
              <PlanetaryPositions positions={results.chartData.positions} />
            </div>
            <div className="lg:col-span-2">
              <Tabs defaultValue="interpretation" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="interpretation">Interpretação do Mapa Natal</TabsTrigger>
                  <TabsTrigger value="transits">Trânsitos Planetários</TabsTrigger>
                </TabsList>
                <TabsContent value="interpretation" className="mt-6">
                  <InterpretationDisplay interpretation={results.interpretation} />
                </TabsContent>
                <TabsContent value="transits" className="mt-6">
                  <TransitAnalysisDisplay transits={results.transits} />
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
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary rounded-full filter blur-3xl"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="bg-primary/50 text-primary-foreground p-4 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500 mb-4">
          Percepções Cósmicas
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
          Desvende os segredos do seu mapa celestial. Insira seus dados de nascimento para gerar um mapa astrológico personalizado e descobrir seu potencial cósmico.
        </p>
      </div>
      <div className="relative z-10 w-full max-w-2xl mt-8">
        <NatalChartForm onSubmit={handleChartRequest} disabled={isLoading} />
      </div>
    </div>
  );
}
