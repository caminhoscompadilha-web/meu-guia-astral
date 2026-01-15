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
  console.log('Iniciando a geração do mapa para:', data.name || 'usuário');
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
      throw new Error('A resposta da IA está incompleta.');
    }
    
    console.log('Geração do mapa concluída com sucesso.');
    return { interpretation, transits };
  } catch (error: any) {
    console.error('ERRO REAL NA SERVER ACTION:', error.message, error.stack);
    // Lança o erro original para que o cliente possa vê-lo durante a depuração
    throw new Error(`Erro Interno do Servidor: ${error.message}`);
  }
}
