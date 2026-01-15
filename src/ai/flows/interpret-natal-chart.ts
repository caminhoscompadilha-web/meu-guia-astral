/**
 * @fileOverview Natal chart interpretation AI agent.
 *
 * - interpretNatalChart - A function that handles the natal chart interpretation process.
 * - InterpretNatalChartInput - The input type for the interpretNatalChart function.
 * - InterpretNatalChartOutput - The return type for the interpretNatalChart function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretNatalChartInputSchema = z.object({
  userName: z.string(),
  planets: z.any(),
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;


export const interpretNatalChart = ai.defineFlow(
  {
    name: 'interpretNatalChart',
    inputSchema: InterpretNatalChartInputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: `Aja como um astrólogo profissional. Analise o seguinte mapa natal para ${input.userName}: ${JSON.stringify(input.planets)}. Dê detalhes sobre personalidade e destino.`,
    });
    return response.text();
  }
);
