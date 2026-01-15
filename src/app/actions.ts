'use server';

import { 
  interpretNatalChart, 
  type InterpretNatalChartInput, 
  type InterpretNatalChartOutput 
} from '@/ai/flows/interpret-natal-chart';
import { 
  analyzePlanetaryTransits, 
  type AnalyzePlanetaryTransitsInput, 
  type AnalyzePlanetaryTransitsOutput 
} from '@/ai/flows/analyze-planetary-transits';

interface ChartGenerationInput {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

interface ChartGenerationOutput {
  interpretation: InterpretNatalChartOutput;
  transits: AnalyzePlanetaryTransitsOutput;
}

export async function generateAstrologicalChart(
  data: ChartGenerationInput
): Promise<ChartGenerationOutput> {
  try {
    const natalChartInput: InterpretNatalChartInput = {
      birthDate: data.birthDate,
      birthTime: data.birthTime,
      birthLocation: data.birthLocation,
    };

    const transitInput: AnalyzePlanetaryTransitsInput = {
      natalChartData: JSON.stringify(data),
      currentDate: new Date().toISOString().split('T')[0],
    };

    // Executa as duas chamadas de IA em paralelo para economizar tempo
    const [interpretation, transits] = await Promise.all([
      interpretNatalChart(natalChartInput),
      analyzePlanetaryTransits(transitInput),
    ]);

    if (!interpretation || !transits) {
      throw new Error('Falha ao gerar a análise astrológica completa.');
    }

    return { interpretation, transits };
  } catch (error) {
    console.error('Erro na Server Action `generateAstrologicalChart`:', error);
    // Lança o erro para que a chamada no lado do cliente possa pegá-lo
    throw new Error('Não foi possível gerar a análise astrológica.');
  }
}
