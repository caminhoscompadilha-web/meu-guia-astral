/**
 * @fileOverview Systemic Oracle AI Agent.
 *
 * Combines Psychological Astrology, Tarot, and Jungian Archetypes to provide a deep,
 * multi-layered analysis based on both natal data and current transits.
 *
 * - interpretNatalChart - The main function that orchestrates the oracle's wisdom.
 * - InterpretNatalChartInput - The input type for the function.
 * - InterpretNatalChartOutput - The return type for the function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretNatalChartInputSchema = z.object({
  userName: z.string(),
  natalChart: z.any().describe("The user's natal chart data, including planets and nodes."),
  transits: z.any().describe("The current planetary positions and lunar phase."),
  tarotCard: z.string().describe("The randomly drawn Tarot card for the day."),
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;

const InterpretNatalChartOutputSchema = z.object({
    philosophicalSummary: z.string().describe("Uma síntese poética da tríade Sol, Lua e Ascendente."),
    soulAndPersonality: z.string().describe("Descrição detalhada de Mercúrio, Vênus e Marte, abordando explicitamente LUZ (potenciais) e SOMBRA (desafios)."),
    destinyAxis: z.string().describe("Interpretação do Eixo do Destino (Nodos Lunares Norte/Sul) de nascimento vs. o trânsito atual, focando na Missão de Vida."),
    externalCycles: z.string().describe("Análise de como os planetas geracionais (Urano, Netuno, Plutão) estão tensionando ou favorecendo o usuário HOJE, com base nos trânsitos."),
    lunarCalendar: z.string().describe("Qual fase da lua estamos hoje e o que ela ativa no mapa do usuário (se é um momento favorável ou desafiador para alguma área)."),
    tarotOfTheDay: z.string().describe("Sorteio e descrição do arquétipo do arcano do dia, correlacionando-o com os trânsitos astrológicos mais relevantes citados."),
    archetypalReflection: z.string().describe("Uma frase final, inspiradora e para meditação, baseada no arquétipo dominante do dia (Tarot + trânsitos).")
});
export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;


const SYSTEM_PROMPT = `
Você é um Oráculo Sistêmico que combina Astrologia Psicológica, Astronomia Técnica, Tarot e Arquétipos de Jung.
Sua missão é fornecer uma análise profunda que equilibre Autoconhecimento (Natal) e Probabilidades Diárias (Trânsitos).
Sua linguagem é poética, mas precisa, inspiradora, mas realista.

SIGA ESTE ROTEIRO DE RESPOSTA ESTRITAMENTE:
1. RESUMO FILOSÓFICO: Comece com uma síntese poética e curta da tríade Sol, Lua e Ascendente do usuário.
2. ALMA E PERSONALIDADE: Faça uma descrição detalhada de Mercúrio, Vênus e Marte do mapa natal. Aborde explicitamente os pontos de LUZ (potenciais) e SOMBRA (desafios) para cada um.
3. EIXO DO DESTINO (NODOS LUNARES): Interprete o significado do Nodo Norte e Sul de nascimento. Em seguida, compare com a posição do Nodo Norte em trânsito hoje, explicando a 'missão de vida' do usuário e como o momento atual a influencia.
4. CICLOS EXTERNOS: Analise como os planetas lentos em trânsito (Urano, Netuno e Plutão) estão aspectando o mapa natal do usuário HOJE. Seja direto sobre quais áreas da vida estão sendo tensionadas ou favorecidas.
5. CALENDÁRIO LUNAR: Informe a fase da lua de HOJE. Explique qual casa do mapa natal do usuário ela está ativando e o que isso significa (ex: "A Lua Crescente em seu setor financeiro sugere...").
6. TAROT DO DIA: Apresente o arcano do dia sorteado. Descreva seu arquétipo e, o mais importante, correlacione-o com os trânsitos astrológicos mais impactantes que você citou nos pontos 4 e 5.
7. REFLEXÃO ARQUETÍPICA: Conclua com uma frase final curta, poderosa e para meditação, baseada no arquétipo dominante do dia (junção do Tarot e dos trânsitos).

Formate a resposta usando markdown para melhor legibilidade (títulos, negrito, listas).
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
      prompt: `Analise os seguintes dados para ${input.userName}:
- Mapa Natal: ${JSON.stringify(input.natalChart)}
- Trânsitos de Hoje: ${JSON.stringify(input.transits)}
- Tarot do Dia: ${input.tarotCard}

Forneça uma análise detalhada e estruturada seguindo o roteiro de 7 passos no formato JSON solicitado.`,
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
