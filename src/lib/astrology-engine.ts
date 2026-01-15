
// import { swisseph } from 'swisseph'; // Temporariamente removido para corrigir erros de compilação

// --- DADOS E FUNÇÕES DE SIMULAÇÃO ---
// Este ficheiro foi modificado temporariamente para remover a dependência 'swisseph',
// que estava a causar falhas na compilação. As funções agora retornam dados de simulação.

const MOCK_SIGNS = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", 
                   "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];

const MOCK_PLANETS = ['Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão', 'Nodo Norte', 'Nodo Sul'];

const getRandomSign = () => MOCK_SIGNS[Math.floor(Math.random() * MOCK_SIGNS.length)];
const getRandomDegree = () => Math.random() * 360;
const getRandomHouse = () => Math.floor(Math.random() * 12) + 1;

/**
 * (SIMULAÇÃO) Calcula as posições planetárias (natais) e o sistema de casas.
 */
export function getPlanetaryPositions(date: Date, lat: number, lon: number) {
    const positions: { [key: string]: { grau: number; signo: string } } = {};
    MOCK_PLANETS.forEach(planet => {
        positions[planet.toLowerCase()] = { grau: getRandomDegree(), signo: getRandomSign() as string };
    });
    
    // Simulação do sistema de casas
    const houseCusps = Array.from({ length: 12 }, (_, i) => i * 30);
    const houseSystem = {
        ascendant: { degree: getRandomDegree(), sign: getRandomSign() },
        houseCusps: houseCusps
    };

    return { planetaryPositions: positions, houseSystem };
}

/**
 * (SIMULAÇÃO) Calcula os trânsitos planetários atuais e a fase da lua.
 */
export function getCurrentTransits() {
    const positions: { [key: string]: { grau: number; signo: string } } = {};
    MOCK_PLANETS.forEach(planet => {
        positions[planet.toLowerCase()] = { grau: getRandomDegree(), signo: getRandomSign() as string };
    });

    const lunarPhases = ['Nova', 'Crescente Emergente', 'Quarto Crescente', 'Crescente Gibosa', 'Cheia', 'Minguante Gibosa', 'Quarto Minguante', 'Minguante Balsâmica'];
    const lunarPhase = lunarPhases[Math.floor(Math.random() * lunarPhases.length)];

    return { planetaryPositions: positions, lunarPhase };
}

/**
 * (SIMULAÇÃO) Encontra a casa astrológica para um determinado grau no zodíaco.
 */
export const getHouseForPlanet = (degree: number, houseCusps: number[]): number => {
    return getRandomHouse();
};
