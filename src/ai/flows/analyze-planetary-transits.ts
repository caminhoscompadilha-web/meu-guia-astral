'use server';

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
  natalChartData: z
    .string()
    .describe(
      'Os dados do mapa natal da pessoa, incluindo data, hora e local de nascimento, formatados como um objeto JSON.'
    ),
  currentDate: z
    .string()
    .describe('A data atual para a qual a análise de trânsito deve ser calculada, no formato AAAA-MM-DD.'),
});
export type AnalyzePlanetaryTransitsInput = z.infer<
  typeof AnalyzePlanetaryTransitsInputSchema
>;

const AnalyzePlanetaryTransitsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'Um resumo dos trânsitos planetários atuais em relação ao mapa natal, identificando fases-chave, ciclos, oportunidades e desafios.'
    ),
  detailedAnalysis: z
    .string()
    .describe(
      'Uma análise detalhada de cada trânsito significativo, incluindo os planetas envolvidos, as casas afetadas e os impactos potenciais.'
    ),
});
export type AnalyzePlanetaryTransitsOutput = z.infer<
  typeof AnalyzePlanetaryTransitsOutputSchema
>;

export async function analyzePlanetaryTransits(
  input: AnalyzePlanetaryTransitsInput
): Promise<AnalyzePlanetaryTransitsOutput> {
  return analyzePlanetaryTransitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePlanetaryTransitsPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: AnalyzePlanetaryTransitsInputSchema},
  output: {schema: AnalyzePlanetaryTransitsOutputSchema},
  prompt: `Você é um astrólogo especialista analisando trânsitos planetários em relação a um mapa natal.

  Forneça um resumo e uma análise detalhada dos trânsitos planetários atuais, com base na data atual, em relação aos dados do mapa natal fornecidos.

  Dados do Mapa Natal: {{{natalChartData}}}
  Data Atual: {{{currentDate}}}

  Resumo:
  - Identifique brevemente as fases-chave, ciclos, oportunidades e desafios indicados pelos trânsitos.

  Análise Detalhada:
  - Forneça uma análise mais aprofundada de cada trânsito significativo, incluindo os planetas envolvidos, as casas afetadas e os impactos potenciais.
`,
});

const analyzePlanetaryTransitsFlow = ai.defineFlow(
  {
    name: 'analyzePlanetaryTransitsFlow',
    inputSchema: AnalyzePlanetaryTransitsInputSchema,
    outputSchema: AnalyzePlanetaryTransitsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
