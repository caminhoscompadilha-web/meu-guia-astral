"use server";

import { interpretNatalChart } from '@/ai/flows/interpret-natal-chart';
import { getPlanetaryPositions, calculateHousesAndAscendant } from '@/lib/astrology-engine';
import { ZODIAC_SIGNS } from '@/lib/constants';

export interface ChartGenerationInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  // Coordenadas fixas para São Paulo, Brasil, para simplificação inicial
  lat: number;
  lon: number;
}

export async function generateAstrologicalChart(
  data: ChartGenerationInput
) {
  console.log('Iniciando a geração do mapa para:', data.name || 'usuário');
  try {
    const birthDateObj = new Date(`${data.birthDate}T${data.birthTime}:00Z`);
    
    // CÁLCULO REAL
    const realPlanets = getPlanetaryPositions(birthDateObj);
    const houseSystem = calculateHousesAndAscendant(birthDateObj, data.lat, data.lon);

    const fullChartData = {
        ...realPlanets,
        ascendente: {
            grau: houseSystem.ascendant.degree,
            signo: houseSystem.ascendant.sign
        }
    };
    
    const interpretationText = await interpretNatalChart({
      userName: data.name || 'Viajante Cósmico',
      planets: fullChartData
    });

    const getHouseForPlanet = (degree: number) => {
        for (let i = 11; i >= 0; i--) {
            const cuspStart = houseSystem.houseCusps[i];
            const cuspEnd = houseSystem.houseCusps[(i + 1) % 12];
            // Lida com a passagem por Áries (0/360 graus)
            if (cuspStart > cuspEnd) {
                if (degree >= cuspStart || degree < cuspEnd) {
                    return i + 1;
                }
            } else {
                if (degree >= cuspStart && degree < cuspEnd) {
                    return i + 1;
                }
            }
        }
        return 1; // Fallback
    };
    
    const positions = Object.entries(fullChartData).map(([planet, planetData]) => ({
      planet: planet.charAt(0).toUpperCase() + planet.slice(1),
      sign: planetData.signo,
      house: getHouseForPlanet(planetData.grau),
    }));

    const finalOutput = {
      interpretation: {
        personalityTraits: interpretationText,
        lifePathAspects: "A análise detalhada do caminho de vida aparecerá aqui em futuras atualizações.",
        potential: "A análise de potencial e forças aparecerá aqui em futuras atualizações.",
        planetaryInterpretations: "A análise planetária completa aparecerá aqui em futuras atualizações."
      },
      transits: {
        summary: "O resumo dos trânsitos planetários atuais aparecerá aqui.",
        detailedAnalysis: "A análise detalhada dos trânsitos aparecerá aqui."
      },
      chartData: {
        positions
      }
    };
    
    return { success: true, data: finalOutput };
    
  } catch (error: any) {
    console.error("ERRO REAL NA SERVER ACTION:", error.message, error.stack);
    return { success: false, error: `Erro Interno do Servidor: ${error.message}` };
  }
}
