"use server";

import { interpretNatalChart } from '@/ai/flows/interpret-natal-chart';
// Note: analyzePlanetaryTransits is not used in the simplified action for now

interface ChartGenerationInput {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

export async function generateAstrologicalChart(
  data: ChartGenerationInput
) {
  console.log('Iniciando a geração do mapa para:', data.name || 'usuário');
  try {
    // Simulando dados que viriam do cálculo astronômico, como sugerido
    const mockPlanets = { 
      Sol: "Áries", 
      Lua: "Escorpião", 
      Ascendente: "Capricórnio",
      birthDate: data.birthDate,
      birthTime: data.birthTime,
      birthLocation: data.birthLocation,
    };
    
    const interpretationText = await interpretNatalChart({
      userName: data.name || 'Viajante Cósmico',
      planets: mockPlanets
    });

    // Para manter a estrutura de retorno compatível com o frontend
    const mockOutput = {
      interpretation: {
        personalityTraits: interpretationText,
        lifePathAspects: "A análise detalhada do caminho de vida aparecerá aqui.",
        potential: "A análise de potencial e forças aparecerá aqui.",
        planetaryInterpretations: "A análise planetária completa aparecerá aqui."
      },
      transits: {
        summary: "O resumo dos trânsitos planetários atuais aparecerá aqui.",
        detailedAnalysis: "A análise detalhada dos trânsitos aparecerá aqui."
      }
    };
    
    return mockOutput;
    
  } catch (error: any) {
    console.error("ERRO REAL NA SERVER ACTION:", error.message, error.stack);
    // Lança o erro original para que o cliente possa vê-lo durante a depuração
    throw new Error(`Erro Interno do Servidor: ${error.message}`);
  }
}
