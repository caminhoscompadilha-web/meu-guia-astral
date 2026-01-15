"use server";

import { interpretNatalChart } from '@/ai/flows/interpret-natal-chart';
import { analyzePlanetaryTransits } from '@/ai/flows/analyze-planetary-transits';
import { getPlanetaryPositions, calculateHousesAndAscendant } from '@/lib/astrology-engine';

export interface ChartGenerationInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  lat: number;
  lon: number;
}

export async function generateAstrologicalChart(
  data: ChartGenerationInput
) {
  console.log('Iniciando a geração do mapa para:', data.name || 'usuário');
  try {
    const birthDateObj = new Date(`${data.birthDate}T${data.birthTime}:00`);
    
    // Calcula posições planetárias e casas
    const planetaryPositions = getPlanetaryPositions(birthDateObj);
    const houseSystem = calculateHousesAndAscendant(birthDateObj, data.lat, data.lon);

    // Mapeia cada planeta para sua casa
    const getHouseForPlanet = (degree: number): number => {
        // As cúspides começam da casa 1 na posição 0 do array
        for (let i = 0; i < 12; i++) {
            const cuspStart = houseSystem.houseCusps[i];
            // A casa 12 é a última, então a próxima cúspide é a da casa 1
            const cuspEnd = houseSystem.houseCusps[(i + 1) % 12];

            // Lógica para lidar com a passagem por Áries (0/360 graus)
            if (cuspStart > cuspEnd) { // ex: Cúspide 12 a 330°, Cúspide 1 a 20°
                if (degree >= cuspStart || degree < cuspEnd) {
                    return i + 1;
                }
            } else {
                if (degree >= cuspStart && degree < cuspEnd) {
                    return i + 1;
                }
            }
        }
        return 1; // Fallback, caso algo dê errado
    };

    const chartWithHouses = Object.fromEntries(
        Object.entries(planetaryPositions).map(([planet, data]) => [
            planet,
            { ...data, casa: getHouseForPlanet(data.grau) }
        ])
    );
    
    // Adiciona o ascendente aos dados para a IA
    const fullChartDataForAI = {
        ...chartWithHouses,
        ascendente: {
            grau: houseSystem.ascendant.degree,
            signo: houseSystem.ascendant.sign,
            casa: 1
        }
    };
    
    // Chama as IAs em paralelo para mais performance
    const [interpretation, transitAnalysis] = await Promise.all([
      interpretNatalChart({
        userName: data.name || 'Viajante Cósmico',
        planets: fullChartDataForAI
      }),
      analyzePlanetaryTransits({
        userName: data.name || 'Viajante Cósmico',
        natalChartData: fullChartDataForAI
      })
    ]);

    // Monta a estrutura de posições para a UI
    const positionsForUI = Object.entries(fullChartDataForAI).map(([planet, planetData]) => ({
      planet: planet.charAt(0).toUpperCase() + planet.slice(1),
      sign: planetData.signo,
      house: planetData.casa,
    }));

    const finalOutput = {
      interpretation,
      transits: {
        summary: transitAnalysis,
        detailedAnalysis: "A análise detalhada dos trânsitos aparecerá aqui em futuras atualizações, quando o fluxo for aprimorado."
      },
      chartData: {
        positions: positionsForUI
      }
    };
    
    return { success: true, data: finalOutput };
    
  } catch (error: any) {
    console.error("ERRO NA SERVER ACTION:", error.message, error.stack);
    return { success: false, error: `Erro ao gerar análise astrológica: ${error.message}` };
  }
}
