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

export const analyzePlanetaryTransits = ai.defineFlow(
  {
    name: 'analyzePlanetaryTransits',
    inputSchema: AnalyzePlanetaryTransitsInputSchema,
  },
  async (input) => {
    const response = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: `Aja como um astrólogo especialista em trânsitos. Analise como os trânsitos planetários atuais impactam o mapa natal de ${input.userName}. Dados do mapa natal: ${JSON.stringify(input.natalChartData)}. Foque em oportunidades e desafios.`,
    });
    return response.text();
  }
);
