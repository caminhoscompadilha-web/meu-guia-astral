'use server';
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
  birthDate: z
    .string()
    .describe('The date of birth in ISO format (YYYY-MM-DD).'),
  birthTime: z.string().describe('The time of birth in HH:mm format.'),
  birthLocation: z.string().describe('The location of birth (city, country).'),
  sunSign: z.string().describe('The sun sign of the person.'),
  moonSign: z.string().describe('The moon sign of the person.'),
  risingSign: z.string().describe('The rising sign of the person.'),
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;

const InterpretNatalChartOutputSchema = z.object({
  personalityTraits: z.string().describe('Interpretation of personality traits based on the natal chart.'),
  lifePathAspects: z.string().describe('Insights into the life path and potential challenges/opportunities.'),
  potential: z.string().describe('Description of the person potential based on the chart.'),
});
export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;

export async function interpretNatalChart(input: InterpretNatalChartInput): Promise<InterpretNatalChartOutput> {
  return interpretNatalChartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretNatalChartPrompt',
  input: {schema: InterpretNatalChartInputSchema},
  output: {schema: InterpretNatalChartOutputSchema},
  prompt: `You are an expert astrologer specializing in natal chart interpretations.

You will use the birth data (date, time, and location) along with the Sun, Moon, and Rising signs to provide a detailed interpretation of the natal chart. Focus on personality traits, life path aspects, and the individual's potential.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
Sun Sign: {{{sunSign}}}
Moon Sign: {{{moonSign}}}
Rising Sign: {{{risingSign}}}

Interpret the natal chart based on the provided information.`,
});

const interpretNatalChartFlow = ai.defineFlow(
  {
    name: 'interpretNatalChartFlow',
    inputSchema: InterpretNatalChartInputSchema,
    outputSchema: InterpretNatalChartOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
