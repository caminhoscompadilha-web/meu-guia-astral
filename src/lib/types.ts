export type ZodiacSign = 
  | 'Áries' | 'Touro' | 'Gêmeos' | 'Câncer' | 'Leão' | 'Virgem' | 'Libra'
  | 'Escorpião' | 'Sagitário' | 'Capricórnio' | 'Aquário' | 'Peixes';

export type Planet = 
  | 'Sol' | 'Lua' | 'Mercúrio' | 'Vênus' | 'Marte' | 'Júpiter' | 'Saturno'
  | 'Urano' | 'Netuno' | 'Plutão' | 'Ascendente';

export type PlanetPosition = {
  planet: Planet;
  sign: ZodiacSign;
  house: number;
};

export interface NatalChartData {
  name?: string;
  positions: PlanetPosition[];
}
