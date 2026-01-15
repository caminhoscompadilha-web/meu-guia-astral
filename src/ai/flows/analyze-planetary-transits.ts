/**
 * @fileOverview Analyzes current planetary transits in relation to a natal chart.
 *
 * - analyzePlanetaryTransits - A function that analyzes planetary transits.
 * - AnalyzePlanetaryTransitsInput - The input type for the analyzePlanetaryTransits function.
 * - AnalyzePlanetaryTransitsOutput - The return type for the analyzePlanetaryTransits function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePlanetaryTransitsInputSchema = z.object({
  userName: z.string(),
  natalChartData: z.any(),
});
export type AnalyzePlanetaryTransitsInput = z.infer<
  typeof AnalyzePlanetaryTransitsInputSchema
>;

const SYSTEM_PROMPT = `
Use como base as seguintes tradições astrológicas:
1. Sistema de Casas: Placidus.
2. Aspectos: Conjunção (0°), Oposição (180°), Quadratura (90°), Trígono (120°) e Sêxtil (60°).
3. Orbes: Máximo de 5 graus para trânsitos.

Sua interpretação deve focar em oportunidades de crescimento e desafios atuais, 
evitando previsões fatalistas. Analise como os planetas em trânsito estão aspectando os planetas natais.
`;

export const analyzePlanetaryTransits = ai.defineFlow(
  {
    name: 'analyzePlanetaryTransits',
    inputSchema: AnalyzePlanetaryTransitsInputSchema,
  },
  async (input) => {
    const response = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        system: SYSTEM_PROMPT,
        prompt: `Aja como um astrólogo especialista em trânsitos. Analise como os trânsitos planetários atuais impactam o mapa natal de ${input.userName}. Dados do mapa natal: ${JSON.stringify(input.natalChartData)}. Foque em oportunidades e desafios importantes para as próximas semanas.`,
    });
    return response.text();
  }
);
