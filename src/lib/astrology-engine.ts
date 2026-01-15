
import { swisseph } from 'swisseph';

// Helper function to get the correct celestial body ID, including nodes
const getBodyId = (name: string): number => {
    switch (name.toLowerCase()) {
        case 'sol': return swisseph.SE_SUN;
        case 'lua': return swisseph.SE_MOON;
        case 'mercúrio': return swisseph.SE_MERCURY;
        case 'vênus': return swisseph.SE_VENUS;
        case 'marte': return swisseph.SE_MARS;
        case 'júpiter': return swisseph.SE_JUPITER;
        case 'saturno': return swisseph.SE_SATURN;
        case 'urano': return swisseph.SE_URANUS;
        case 'netuno': return swisseph.SE_NEPTUNE;
        case 'plutão': return swisseph.SE_PLUTO;
        case 'nodo norte': return swisseph.SE_TRUE_NODE;
        default: return -1;
    }
}

const CELESTIAL_BODIES = [
    { id: swisseph.SE_SUN, name: 'Sol' },
    { id: swisseph.SE_MOON, name: 'Lua' },
    { id: swisseph.SE_MERCURY, name: 'Mercúrio' },
    { id: swisseph.SE_VENUS, name: 'Vênus' },
    { id: swisseph.SE_MARS, name: 'Marte' },
    { id: swisseph.SE_JUPITER, name: 'Júpiter' },
    { id: swisseph.SE_SATURN, name: 'Saturno' },
    { id: swisseph.SE_URANUS, name: 'Urano' },
    { id: swisseph.SE_NEPTUNE, name: 'Netuno' },
    { id: swisseph.SE_PLUTO, name: 'Plutão' },
    { id: swisseph.SE_TRUE_NODE, name: 'Nodo Norte' },
];

/**
 * Converte graus longitudinais (0-360) para um signo do zodíaco.
 */
const getSign = (degrees: number): string => {
    const signs = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", 
                   "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    return signs[Math.floor(degrees / 30)];
};

/**
 * Calcula a data juliana para um determinado objeto Date.
 */
const getJulianDay = (date: Date): number => {
    return swisseph.julday(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1, // swisseph usa meses 1-12
        date.getUTCDate(),
        date.getUTCHours() + date.getUTCMinutes() / 60,
        swisseph.SE_GREG_CAL
    );
};

/**
 * Calcula as posições planetárias (natais) e o sistema de casas.
 */
export function getPlanetaryPositions(date: Date, lat: number, lon: number) {
    const julianDay = getJulianDay(date);
    const positions: { [key: string]: { grau: number; signo: string } } = {};

    CELESTIAL_BODIES.forEach(body => {
        const bodyData = swisseph.calc_ut(julianDay, body.id, swisseph.SEFLG_SPEED);
        let longitude = bodyData.longitude;

        if (body.name === 'Nodo Norte') {
            positions['nodo norte'] = { grau: longitude, signo: getSign(longitude) };
            const southNodeLongitude = (longitude + 180) % 360;
            positions['nodo sul'] = { grau: southNodeLongitude, signo: getSign(southNodeLongitude) };
        } else {
            positions[body.name.toLowerCase()] = { grau: longitude, signo: getSign(longitude) };
        }
    });
    
    // 'P' refere-se ao sistema Placidus para casas
    const houseSystem = swisseph.houses(julianDay, lat, lon, 'P');

    return { planetaryPositions: positions, houseSystem };
}

/**
 * Determina a fase da lua com base na elongação entre Sol e Lua.
 */
const getLunarPhase = (sunLon: number, moonLon: number): string => {
    let diff = (moonLon - sunLon + 360) % 360;
    if (diff < 45) return 'Nova';
    if (diff < 90) return 'Crescente Emergente';
    if (diff < 135) return 'Quarto Crescente';
    if (diff < 180) return 'Crescente Gibosa';
    if (diff < 225) return 'Cheia';
    if (diff < 270) return 'Minguante Gibosa';
    if (diff < 315) return 'Quarto Minguante';
    return 'Minguante Balsâmica';
};

/**
 * Calcula os trânsitos planetários atuais e a fase da lua.
 */
export function getCurrentTransits() {
    const julianDay = getJulianDay(new Date());
    const positions: { [key: string]: { grau: number; signo: string } } = {};
    let sunLon = 0, moonLon = 0;

    // Calcula a posição de todos os corpos, incluindo os Nodos
    CELESTIAL_BODIES.forEach(body => {
        const bodyData = swisseph.calc_ut(julianDay, body.id, swisseph.SEFLG_SPEED);
        const longitude = bodyData.longitude;
         if (body.name === 'Nodo Norte') {
            positions['nodo norte'] = { grau: longitude, signo: getSign(longitude) };
            const southNodeLongitude = (longitude + 180) % 360;
            positions['nodo sul'] = { grau: southNodeLongitude, signo: getSign(southNodeLongitude) };
        } else {
            positions[body.name.toLowerCase()] = { grau: longitude, signo: getSign(longitude) };
        }
        if (body.id === swisseph.SE_SUN) sunLon = longitude;
        if (body.id === swisseph.SE_MOON) moonLon = longitude;
    });

    const lunarPhase = getLunarPhase(sunLon, moonLon);

    return { planetaryPositions: positions, lunarPhase };
}

/**
 * Encontra a casa astrológica para um determinado grau no zodíaco.
 */
export const getHouseForPlanet = (degree: number, houseCusps: number[]): number => {
    // A primeira cúspide (Ascendente) é a casa 1.
    const ascendant = houseCusps[0];
    const normalizedAscendant = ascendant;

    // Normaliza os graus dos planetas e das cúspides em relação ao ascendente
    const normalizedDegree = (degree - normalizedAscendant + 360) % 360;
    
    const normalizedCusps = houseCusps.map(cusp => (cusp - normalizedAscendant + 360) % 360);
    // Adiciona o ponto final do círculo para fechar a casa 12
    const extendedCusps = [...normalizedCusps, 360];

    for (let i = 0; i < 12; i++) {
        const startCusp = extendedCusps[i];
        const endCusp = extendedCusps[i+1];
        
        // Lida com o caso em que a cúspide final é menor que a inicial (ex: a cúspide da casa 12 para a 1)
        if (endCusp < startCusp) {
           if (normalizedDegree >= startCusp || normalizedDegree < endCusp) {
               return i + 1;
           }
        } else {
            if (normalizedDegree >= startCusp && normalizedDegree < endCusp) {
                return i + 1;
            }
        }
    }
    
    // Fallback para caso algo dê errado, embora não deva acontecer
    return 12;
};
