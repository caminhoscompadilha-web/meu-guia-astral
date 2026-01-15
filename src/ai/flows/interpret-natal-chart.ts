

/**
 * @fileOverview Systemic Oracle AI Agent - The "Astral Strategist".
 *
 * This flow generates a 30-day cycle plan based on 6 critical pillars,
 * providing a premium astrological consultancy experience.
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
  lastTarotCard: z.string().optional().describe("The Tarot card from the user's previous session, if available.")
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;

const InterpretNatalChartOutputSchema = z.object({
  perfil_do_mes: z.string().describe("Uma síntese astrológica do clima geral para o utilizador"),
  pilares: z.object({
    trabalho_e_financas: z.object({
      analise: z.string().describe("Análise dos trânsitos nas casas 2, 6 e 10."),
      solucao: z.string().describe("Ação estratégica para aumentar a prosperidade.")
    }),
    amor_e_relacionamentos: z.object({
      analise: z.string().describe("Análise de Vénus e da Casa 7."),
      solucao: z.string().describe("Como lidar com parcerias e afetos este mês.")
    }),
    saude_e_vitalidade: z.object({
      analise: z.string().describe("Análise de Marte e da Casa 6."),
      solucao: z.string().describe("Recomendação física e energética (biohacking astral).")
    }),
    reflexao_e_espiritualidade: z.object({
      analise: z.string().describe("Onde o utilizador deve silenciar (Casa 12/Neptuno)."),
      solucao: z.string().describe("Tema de meditação ou estudo.")
    })
  }),
  fases_de_execucao: z.object({
    revisao: z.string().describe("O que o utilizador deve PAUSAR ou REAVALIAR agora."),
    acao: z.string().describe("Onde ele deve colocar FORÇA TOTAL esta semana.")
  }),
  alerta_geografico_sombra: z.string().describe("Risco específico na localização atual."),
  alerta_geografico_luz: z.string().describe("Ponto de sorte na localização atual.")
});

export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;

const SYSTEM_PROMPT = `
PERSONA: És o "Estrategista Astral" do Portal Meu Guia Astral. O teu tom é profundo, sofisticado e prático.

OBJETIVO: Gerar um Plano de Ciclo de 30 dias dividido em 6 Pilares Críticos para quem adquiriu o Relatório Premium.

ESTRUTURA DE RESPOSTA OBRIGATÓRIA (JSON):
Sempre retorne um JSON válido com a seguinte estrutura:
{
  "perfil_do_mes": "Uma síntese astrológica do clima geral para o utilizador",
  "pilares": {
    "trabalho_e_financas": {
      "analise": "Trânsitos em casas 2, 6 e 10",
      "solucao": "Ação estratégica para aumentar a prosperidade"
    },
    "amor_e_relacionamentos": {
      "analise": "Vénus e Casa 7",
      "solucao": "Como lidar com parcerias e afetos este mês"
    },
    "saude_e_vitalidade": {
      "analise": "Marte e Casa 6",
      "solucao": "Recomendação física e energética (biohacking astral)"
    },
    "reflexao_e_espiritualidade": {
      "analise": "Onde o utilizador deve silenciar (Casa 12/Neptuno)",
      "solucao": "Tema de meditação ou estudo"
    }
  },
  "fases_de_execucao": {
    "revisao": "O que o utilizador deve PAUSAR ou REAVALIAR agora",
    "acao": "Onde ele deve colocar FORÇA TOTAL esta semana"
  },
  "alerta_geografico_sombra": "Risco específico na localização atual",
  "alerta_geografico_luz": "Ponto de sorte na localização atual"
}
`;


export async function getOracleAnalysis(input: InterpretNatalChartInput): Promise<InterpretNatalChartOutput> {
  
  let userPrompt = `INSTRUÇÃO DE IDIOMA: Toda a resposta, incluindo os títulos dos pilares (Trabalho, Amor, Saúde, etc.), deve ser obrigatoriamente escrita em '${input.language}'. Use termos culturais apropriados para este idioma.

Analise os seguintes dados para ${input.userName}:
- Dados Natais: ${JSON.stringify(input.natalChart)}
- Trânsitos de Hoje: ${JSON.stringify(input.transits)}
- Tarot do Dia: ${input.tarotCard}
`;

  if (input.lastTarotCard) {
    userPrompt += `- Tarot da Consulta Anterior: ${input.lastTarotCard}\nTAREFA EVOLUTIVA: Comece a análise do tarot reconhecendo a transição da energia da carta anterior para a atual.`;
  }

  userPrompt += `\nForneça uma análise detalhada e estruturada seguindo as REGRAS e a ESTRUTURA DE RESPOSTA (JSON).`;


  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: SYSTEM_PROMPT,
    prompt: userPrompt,
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
