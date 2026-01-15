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

const InterpretNatalChartOutputSchema = z.object({
    personalityTraits: z.string().describe("Análise da tríade Sol, Lua e Ascendente, focando na personalidade, motivações e como a pessoa se apresenta ao mundo."),
    lifePathAspects: z.string().describe("Análise sobre carreira, vocação e propósito de vida, com base em planetas relevantes como Meio do Céu, Júpiter e Saturno."),
    potential: z.string().describe("Análise sobre as forças, talentos e potenciais inatos indicados no mapa."),
    planetaryInterpretations: z.string().describe("Uma análise textual e fluida de cada planeta (Sol, Lua, Mercúrio, etc.) em seu respectivo signo e casa, explicando o que cada posição significa.")
});
export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;


const SYSTEM_PROMPT = `
Use como base as seguintes tradições astrológicas:
1. Sistema de Casas: Placidus.
2. Dignidades Planetárias: Domicílio, Exílio, Exaltação e Queda.
3. Aspectos: Conjunção (0°), Oposição (180°), Quadratura (90°), Trígono (120°) e Sêxtil (60°).
4. Orbes: Máximo de 8 graus para planetas pessoais e 5 graus para os demais.

Sua interpretação deve seguir o estilo 'Astrologia Psicológica Modernista': 
focada em autoconhecimento, potencial de carreira e desafios emocionais, 
evitando previsões fatalistas.

Seja empático, inspirador, mas realista, com um tom semelhante ao do site Astrolink.
Estruture sua resposta EXATAMENTE no formato JSON solicitado.
`;

export const interpretNatalChart = ai.defineFlow(
  {
    name: 'interpretNatalChart',
    inputSchema: InterpretNatalChartInputSchema,
    outputSchema: InterpretNatalChartOutputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      system: SYSTEM_PROMPT,
      prompt: `Aja como um astrólogo profissional e empático. Analise o seguinte mapa natal para ${input.userName}: ${JSON.stringify(input.planets)}. Forneça uma análise detalhada e estruturada de acordo com o schema de saída.`,
      output: {
        format: 'json',
        schema: InterpretNatalChartOutputSchema,
      },
    });
    
    const output = response.output();
    if (!output) {
      throw new Error("A resposta da IA não contém o output esperado.");
    }
    return output;
  }
);
