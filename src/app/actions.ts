
"use server";

import { getOracleAnalysis, type InterpretNatalChartInput } from '@/ai/flows/interpret-natal-chart';
import { getPlanetaryPositions, getCurrentTransits, getHouseForPlanet } from '@/lib/astrology-engine';
import { drawTarotCard } from '@/lib/tarot';

export interface ChartGenerationInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  lat: number;
  lon: number;
  lang: 'pt' | 'en' | 'es' | 'it' | 'fr';
}

export async function generateAstrologicalChart(
  data: ChartGenerationInput
) {
  console.log('Iniciando a geração do mapa para:', data.name || 'usuário');
  try {
    const birthDateObj = new Date(`${data.birthDate}T${data.birthTime}:00`);
    
    const { planetaryPositions: natalPositions, houseSystem } = getPlanetaryPositions(birthDateObj, data.lat, data.lon);
    const transits = getCurrentTransits();

    const natalChartWithHouses = Object.fromEntries(
        Object.entries(natalPositions).map(([planet, planetData]) => {
            if (planet === 'nodo norte' || planet === 'nodo sul') {
                return [planet, { ...planetData, casa: null }];
            }
            return [
                planet,
                { ...planetData, casa: getHouseForPlanet(planetData.grau, houseSystem.houseCusps) }
            ];
        })
    );
    
    const fullNatalChart = {
        ...natalChartWithHouses,
        ascendente: {
            grau: houseSystem.ascendant.degree,
            signo: houseSystem.ascendant.sign,
            casa: 1
        }
    };
    
    const tarotCard = drawTarotCard();

    const oracleInput: InterpretNatalChartInput = {
      userName: data.name || 'Viajante Cósmico',
      natalChart: fullNatalChart,
      transits: {
        ...transits.planetaryPositions,
        faseDaLua: transits.lunarPhase,
      },
      tarotCard: tarotCard.name,
      language: data.lang,
    };

    const interpretation = await getOracleAnalysis(oracleInput);

    const positionsForUI = Object.entries(fullNatalChart)
        .filter(([planet, planetData]) => planetData.casa !== null && planet !== 'ascendente') 
        .map(([planet, planetData]) => ({
            planet: planet.charAt(0).toUpperCase() + planet.slice(1),
            sign: planetData.signo,
            house: planetData.casa,
        }));
        
    if (fullNatalChart.ascendente) {
        positionsForUI.unshift({
            planet: 'Ascendente',
            sign: fullNatalChart.ascendente.signo,
            house: 1
        });
    }


    const finalOutput = {
      interpretation,
      chartData: {
        name: data.name || 'Viajante Cósmico',
        positions: positionsForUI
      }
    };
    
    return { success: true, data: finalOutput };
    
  } catch (error: any) {
    console.error("ERRO NA SERVER ACTION:", error.message, error.stack);
    return { success: false, error: `Erro ao gerar análise astrológica: ${error.message}` };
  }
}
