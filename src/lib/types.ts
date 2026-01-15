
export type ZodiacSign = 
  | 'Áries' | 'Touro' | 'Gêmeos' | 'Câncer' | 'Leão' | 'Virgem' | 'Libra'
  | 'Escorpião' | 'Sagitário' | 'Capricórnio' | 'Aquário' | 'Peixes';

export type Planet = 
  | 'Sol' | 'Lua' | 'Mercúrio' | 'Vênus' | 'Marte' | 'Júpiter' | 'Saturno'
  | 'Urano' | 'Netuno' | 'Plutão' | 'Ascendente' | 'Nodo Norte' | 'Nodo Sul';

export type PlanetPosition = {
  planet: string; // Changed to string to allow for more flexibility
  sign: ZodiacSign;
  house: number;
};

export interface NatalChartData {
  name?: string;
  positions: PlanetPosition[];
}
