import { swisseph } from 'swisseph';

// Adicionado o Nodo Norte Verdadeiro
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

        // O Nodo Sul é sempre 180 graus oposto ao Nodo Norte
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

    CELESTIAL_BODIES.forEach(body => {
        const bodyData = swisseph.calc_ut(julianDay, body.id, swisseph.SEFLG_SPEED);
        const longitude = bodyData.longitude;
        positions[body.name.toLowerCase()] = { grau: longitude, signo: getSign(longitude) };
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
    for (let i = 0; i < 12; i++) {
        const cuspStart = houseCusps[i];
        const cuspEnd = houseCusps[(i + 1) % 12];
        if (cuspStart > cuspEnd) { // Lida com a passagem por Áries (0/360 graus)
            if (degree >= cuspStart || degree < cuspEnd) return i + 1;
        } else {
            if (degree >= cuspStart && degree < cuspEnd) return i + 1;
        }
    }
    return 1; // Fallback
};
