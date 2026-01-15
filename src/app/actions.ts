
"use server";

import { interpretNatalChart } from '@/ai/flows/interpret-natal-chart';
import { getPlanetaryPositions, getCurrentTransits, getHouseForPlanet } from '@/lib/astrology-engine';
import { drawTarotCard } from '@/lib/tarot';

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
    
    // 1. Cálculos Astrológicos (Natais e Trânsitos)
    const { planetaryPositions: natalPositions, houseSystem } = getPlanetaryPositions(birthDateObj, data.lat, data.lon);
    const transits = getCurrentTransits();

    // Mapeia cada planeta natal para sua casa
    const natalChartWithHouses = Object.fromEntries(
        Object.entries(natalPositions).map(([planet, planetData]) => {
            // Os nodos não ficam em casas, então os excluímos deste cálculo específico
            if (planet === 'nodo norte' || planet === 'nodo sul') {
                return [planet, { ...planetData, casa: null }];
            }
            return [
                planet,
                { ...planetData, casa: getHouseForPlanet(planetData.grau, houseSystem.houseCusps) }
            ];
        })
    );
    
    // Adiciona o ascendente aos dados para a IA
    const fullNatalChart = {
        ...natalChartWithHouses,
        ascendente: {
            grau: houseSystem.ascendant.degree,
            signo: houseSystem.ascendant.sign,
            casa: 1
        }
    };
    
    // 2. Sorteio do Tarot
    const tarotCard = drawTarotCard();

    // 3. Monta o input para o "Oráculo Sistêmico"
    const oracleInput = {
      userName: data.name || 'Viajante Cósmico',
      natalChart: fullNatalChart,
      transits: {
        ...transits.planetaryPositions,
        faseDaLua: transits.lunarPhase,
      },
      tarotCard: tarotCard.name,
    };

    // 4. Chama a IA com o contexto completo
    const interpretation = await interpretNatalChart(oracleInput);

    // 5. Monta a estrutura de posições para a UI
    const positionsForUI = Object.entries(fullNatalChart)
        .filter(([planet, planetData]) => planetData.casa !== null) // Filtra planetas que têm casa
        .map(([planet, planetData]) => ({
            planet: planet.charAt(0).toUpperCase() + planet.slice(1),
            sign: planetData.signo,
            house: planetData.casa,
        }));

    const finalOutput = {
      interpretation,
      // O objeto de trânsitos para a UI agora é a própria interpretação
      transits: interpretation, 
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
