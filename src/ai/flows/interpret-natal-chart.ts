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
  planetaryInterpretations: z.string().describe('Interpretação detalhada de cada planeta (pessoais, sociais e geracionais), incluindo sua mitologia e influência na personalidade do indivíduo.'),
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

Com base nos dados de nascimento (data, hora e local), determine os signos Solar, Lunar e Ascendente. Em seguida, use essa informação para fornecer uma interpretação detalhada do mapa natal.

Data de Nascimento: {{{birthDate}}}
Hora de Nascimento: {{{birthTime}}}
Local de Nascimento: {{{birthLocation}}}

Organize sua resposta nos seguintes tópicos:
1.  **Traços de Personalidade:** Uma análise geral da personalidade com base nos signos Solar, Lunar e Ascendente.
2.  **Caminho de Vida e Oportunidades:** Insights sobre a jornada de vida, vocação, desafios e oportunidades de crescimento.
3.  **Forças e Potencial:** Destaque as qualidades e talentos inatos que o mapa revela.
4.  **Interpretações Planetárias Detalhadas:** Crie uma seção para cada planeta, organizada da seguinte forma, e associe cada um à sua mitologia:
    *   **Planetas Pessoais (Trânsitos Rápidos):**
        *   **Mercúrio:** Como a pessoa pensa, aprende e se comunica.
        *   **Vênus:** Como a pessoa ama, o que valoriza e seu senso estético.
        *   **Marte:** Sua força de ação, iniciativa, desejo e como lida com conflitos.
    *   **Planetas Sociais:**
        *   **Júpiter:** Onde a pessoa encontra expansão, sorte, ética e oportunidades.
        *   **Saturno:** Onde estão seus limites, responsabilidades, disciplina e caminho para a maturidade.
    *   **Planetas Geracionais (Transpessoais):**
        *   **Urano:** Onde busca inovação, rebeldia e rupturas.
        *   **Netuno:** Sua conexão com a espiritualidade, sonhos, ilusões e artes.
        *   **Plutão:** Onde ocorrem suas transformações profundas, o encontro com o poder e o renascimento.

Seja claro, organizado e intuitivo em suas explicações.`,
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
