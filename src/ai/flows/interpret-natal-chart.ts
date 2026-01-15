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

const SYSTEM_PROMPT = `
Use como base as seguintes tradições astrológicas:
1. Sistema de Casas: Placidus.
2. Dignidades Planetárias: Domicílio, Exílio, Exaltação e Queda.
3. Aspectos: Conjunção (0°), Oposição (180°), Quadratura (90°), Trígono (120°) e Sêxtil (60°).
4. Orbes: Máximo de 8 graus para planetas pessoais.

Sua interpretação deve seguir o estilo 'Astrologia Psicológica Modernista': 
focada em autoconhecimento, potencial de carreira e desafios emocionais, 
evitando previsões fatalistas.
`;

export const interpretNatalChart = ai.defineFlow(
  {
    name: 'interpretNatalChart',
    inputSchema: InterpretNatalChartInputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      system: SYSTEM_PROMPT,
      prompt: `Aja como um astrólogo profissional e empático. Analise o seguinte mapa natal para ${input.userName}: ${JSON.stringify(input.planets)}. Forneça uma análise detalhada da personalidade, focando na tríade Sol, Lua e Ascendente. Mantenha um tom inspirador, mas realista, semelhante ao Astrolink.`,
    });
    return response.text();
  }
);
