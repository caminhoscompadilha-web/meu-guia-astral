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
      'Natal chart data including date, time, and location of birth, formatted as JSON.'
    ),
  currentDate: z
    .string()
    .describe('The current date for transit analysis, formatted as YYYY-MM-DD.'),
});
export type AnalyzePlanetaryTransitsInput = z.infer<
  typeof AnalyzePlanetaryTransitsInputSchema
>;

const AnalyzePlanetaryTransitsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the current planetary transits in relation to the natal chart, identifying key phases, cycles, opportunities, and challenges.'
    ),
  detailedAnalysis: z
    .string()
    .describe(
      'A more detailed analysis of each significant transit, including the planets involved, the houses affected, and potential impacts.'
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
  input: {schema: AnalyzePlanetaryTransitsInputSchema},
  output: {schema: AnalyzePlanetaryTransitsOutputSchema},
  prompt: `You are an expert astrologer analyzing planetary transits in relation to a natal chart.

  Provide a summary and a detailed analysis of the current planetary transits, based on the current date, in relation to the provided natal chart data.

  Natal Chart Data: {{{natalChartData}}}
  Current Date: {{{currentDate}}}

  Summary:
  - Briefly identify the key phases, cycles, opportunities, and challenges indicated by the transits.

  Detailed Analysis:
  - Provide a more in-depth analysis of each significant transit, including the planets involved, the houses affected, and potential impacts.
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
