export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra'
  | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type Planet = 
  | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn'
  | 'Uranus' | 'Neptune' | 'Pluto' | 'Ascendant';

export type PlanetPosition = {
  planet: Planet;
  sign: ZodiacSign;
  house: number;
};

export interface NatalChartData {
  name?: string;
  positions: PlanetPosition[];
}
