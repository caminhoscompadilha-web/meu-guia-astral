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
    .describe('A data de nascimento no formato ISO (AAAA-MM-DD).'),
  birthTime: z.string().describe('A hora de nascimento no formato HH:mm.'),
  birthLocation: z.string().describe('O local de nascimento (cidade, país).'),
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;

const InterpretNatalChartOutputSchema = z.object({
  personalityTraits: z.string().describe('Interpretação de traços de personalidade com base no mapa natal.'),
  lifePathAspects: z.string().describe('Insights sobre o caminho de vida e potenciais desafios/oportunidades.'),
  potential: z.string().describe('Descrição do potencial da pessoa com base no mapa.'),
});
export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;

export async function interpretNatalChart(input: InterpretNatalChartInput): Promise<InterpretNatalChartOutput> {
  return interpretNatalChartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretNatalChartPrompt',
  input: {schema: InterpretNatalChartInputSchema},
  output: {schema: InterpretNatalChartOutputSchema},
  prompt: `Você é um astrólogo especialista em interpretações de mapa natal.

Com base nos dados de nascimento (data, hora e local), determine os signos Solar, Lunar e Ascendente. Em seguida, use essa informação para fornecer uma interpretação detalhada do mapa natal. Foque nos traços de personalidade, aspectos do caminho de vida e no potencial do indivíduo.

Data de Nascimento: {{{birthDate}}}
Hora de Nascimento: {{{birthTime}}}
Local de Nascimento: {{{birthLocation}}}

Interprete o mapa natal com base nas informações fornecidas.`,
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
