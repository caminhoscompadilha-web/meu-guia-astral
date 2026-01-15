import { swisseph } from 'swiss-ephemeris';

const PLANETS_TO_CALCULATE = [
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
 * Calcula as posições longitudinais dos planetas para uma data e hora específicas.
 */
export function getPlanetaryPositions(date: Date) {
    const julianDay = swisseph.julday(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1, // swisseph usa meses 1-12
        date.getUTCDate(),
        date.getUTCHours() + date.getUTCMinutes() / 60,
        swisseph.SE_GREG_CAL
    );

    const positions: { [key: string]: { grau: number; signo: string } } = {};

    PLANETS_TO_CALCULATE.forEach(planetInfo => {
        const planetData = swisseph.calc_ut(julianDay, planetInfo.id, swisseph.SEFLG_SPEED);
        positions[planetInfo.name.toLowerCase()] = {
            grau: planetData.longitude,
            signo: getSign(planetData.longitude)
        };
    });

    return positions;
}

/**
 * Calcula as cúspides das casas e as posições do Ascendente e Meio do Céu.
 */
export function calculateHousesAndAscendant(date: Date, lat: number, lng: number) {
    const julianDay = swisseph.julday(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours() + date.getUTCMinutes() / 60,
        swisseph.SE_GREG_CAL
    );

    // 'P' refere-se ao sistema Placidus
    const housesData = swisseph.houses(julianDay, lat, lng, 'P');

    return {
        ascendant: {
            degree: housesData.ascendant,
            sign: getSign(housesData.ascendant)
        },
        mc: {
            degree: housesData.mc,
            sign: getSign(housesData.mc)
        },
        houseCusps: housesData.house // Array com o início de cada uma das 12 casas
    };
}
