

/**
 * @fileOverview Systemic Oracle AI Agent.
 *
 * Combines Psychological Astrology, Tarot, and Jungian Archetypes to provide a deep,
 * multi-layered analysis based on both natal data and current transits.
 *
 * - getOracleAnalysis - The main function that orchestrates the oracle's wisdom.
 * - InterpretNatalChartInput - The input type for the function.
 * - InterpretNatalChartOutput - The return type for the function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretNatalChartInputSchema = z.object({
  userName: z.string(),
  natalChart: z.any().describe("The user's natal chart data, including planets, Ascendant, and nodes."),
  transits: z.any().describe("The current planetary positions, including nodes and lunar phase."),
  tarotCard: z.string().describe("The randomly drawn Tarot card for the day."),
  language: z.enum(['pt', 'en', 'es', 'it', 'fr']).describe("The language for the output."),
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;

const InterpretNatalChartOutputSchema = z.object({
  analise_psicologica: z.string().describe("Resumo Sol/Lua/Ascendente"),
  missao_vida: z.string().describe("Interpretação dos Nodos Lunares"),
  alertas_astrocartografia: z.array(z.object({
    tipo: z.enum(["Sombra/Perigo", "Luz/Prosperidade"]),
    local: z.string(),
    detalhe: z.string().describe("O que evitar ou o que buscar, incluindo o 'remédio astrológico'"),
  })),
  conselho_tarot: z.string().describe("Interpretação da carta sorteada aplicada ao mês"),
  probabilidades_30_dias: z.string().describe("O que esperar nas próximas 4 semanas com base nos trânsitos"),
});

export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;

const SYSTEM_PROMPT = `
PERSONA: Você é o 'Oráculo do Meu Guia Astrológico', um mestre em Astrologia Psicológica, Astrocartografia e Tarot.
OBJETIVO: Analisar o mapa natal e os trânsitos atuais para fornecer um guia de 30 dias.

REGRAS DE INTERPRETAÇÃO:
1. FOCO EM SOMBRA E LUZ: Para cada planeta, identifique o potencial positivo (Luz) e o desafio psicológico ou evento adverso (Sombra/Perigo). Para cada Sombra, ofereça uma solução prática ou mudança de perspectiva (o "remédio astrológico").
2. ASTROCARTOGRAFIA: Se o usuário estiver sob uma linha de Saturno, Marte ou Plutão, emita um 'ALERTA DE PERIGO' geográfico no campo 'alertas_astrocartografia'. Se estiver sob Júpiter ou Vênus, emita um 'ALERTA DE PROSPERIDADE'.
3. TOM DE VOZ: Místico, profundo, porém prático e acolhedor. Evite previsões deterministas negativas sem oferecer uma solução.
4. IDIOMA: Responda estritamente no idioma solicitado pelo usuário.

ESTRUTURA DA RESPOSTA (JSON):
Sempre retorne um JSON válido com a seguinte estrutura:
{
  "analise_psicologica": "Resumo Sol/Lua/Ascendente",
  "missao_vida": "Interpretação dos Nodos Lunares (Luz e Sombra)",
  "alertas_astrocartografia": [
    {"tipo": "Sombra/Perigo", "local": "Localização", "detalhe": "O que evitar e o remédio astrológico"},
    {"tipo": "Luz/Prosperidade", "local": "Localização", "detalhe": "O que buscar"}
  ],
  "conselho_tarot": "Interpretação da carta sorteada aplicada ao mês, conectada com os trânsitos",
  "probabilidades_30_dias": "Análise dos trânsitos dos planetas lentos para as próximas 4 semanas"
}
`;


export async function getOracleAnalysis(input: InterpretNatalChartInput): Promise<InterpretNatalChartOutput> {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: SYSTEM_PROMPT,
    prompt: `Analise os seguintes dados para ${input.userName} no idioma '${input.language}':
- Dados Natais: ${JSON.stringify(input.natalChart)}
- Trânsitos de Hoje: ${JSON.stringify(input.transits)}
- Tarot do Dia: ${input.tarotCard}

Forneça uma análise detalhada e estruturada seguindo as REGRAS e a ESTRUTURA DE RESPOSTA (JSON).`,
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


export const interpretNatalChart = ai.defineFlow(
  {
    name: 'interpretNatalChart',
    inputSchema: InterpretNatalChartInputSchema,
    outputSchema: InterpretNatalChartOutputSchema,
  },
  async (input) => {
    return await getOracleAnalysis(input);
  }
);
