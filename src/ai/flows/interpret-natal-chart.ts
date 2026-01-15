
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
    externalCycles: z.string().describe("Análise de como os planetas geracionais (Júpiter, Saturno, Urano, Netuno, Plutão) estão tensionando ou favorecendo o usuário HOJE, com base nos trânsitos."),
    lunarCalendar: z.string().describe("Qual fase da lua estamos hoje e o que ela ativa no mapa do usuário (se é um momento favorável ou desafiador para alguma área)."),
    tarotOfTheDay: z.string().describe("Sorteio e descrição do arquétipo do arcano do dia, correlacionando-o com os trânsitos astrológicos mais relevantes citados."),
    archetypalReflection: z.string().describe("Uma frase final, inspiradora e para meditação, baseada no arquétipo dominante do dia (Tarot + trânsitos)."),
    astrocartographyAnalysis: z.string().describe("Análise astrocartográfica com alertas de luz e sombra, e geopolítica pessoal."),
});
export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;


const SYSTEM_PROMPT = `
Você é um Oráculo Sistêmico que combina Astrologia Psicológica, Astronomia Técnica, Tarot e Arquétipos de Jung.
Sua missão é fornecer uma análise profunda que equilibre Autoconhecimento (Natal) e Probabilidades Diárias (Trânsitos e Astrocartografia).
Sua linguagem é poética, mas precisa, inspiradora, mas realista.

SIGA ESTE ROTEIRO DE RESPOSTA ESTRITAMENTE:
1. RESUMO FILOSÓFICO: Comece com uma síntese poética e curta da tríade Sol, Lua e Ascendente do usuário.
2. ALMA E PERSONALIDADE: Faça uma descrição detalhada de Mercúrio, Vênus e Marte do mapa natal. Aborde explicitamente os pontos de LUZ (potenciais) e SOMBRA (desafios) para cada um.
3. EIXO DO DESTINO (NODOS LUNARE): Interprete o significado do Nodo Norte e Sul de nascimento. Em seguida, compare com a posição do Nodo Norte em trânsito hoje, explicando a 'missão de vida' do usuário e como o momento atual a influencia.
    INSTRUÇÃO ESPECÍFICA PARA OS NODOS LUNARE:
    - ANALISE O NODO SUL (Cauda do Dragão): Identifique as 'Sombras' - comportamentos repetitivos, zona de conforto e vícios emocionais que o usuário traz.
    - ANALISE O NODO NORTE (Cabeça do Dragão): Identifique a 'Luz' - o propósito de evolução, as virtudes a serem desenvolvidas e o chamado do destino.
    - CORRELAÇÃO DE TRANSITO: Compare o signo do Nodo Norte de nascimento com a posição do Nodo Norte HOJE.
        * Se estiverem no mesmo signo (Retorno de Nodos), enfatize um momento de destino crucial.
        * Se estiverem em signos opostos (Inversão), enfatize uma fase de revisão total de valores.
    - TOM DE VOZ: Use uma linguagem filosófica e arquetípica, focada em 'Individuação' (Jung).
4. CICLOS EXTERNOS (PLANETAS SOCIAIS E GERACIONAIS): Analise como os planetas lentos em trânsito (Júpiter, Saturno, Urano, Netuno e Plutão) estão aspectando o mapa natal do usuário HOJE. Seja direto sobre quais áreas da vida estão sendo tensionadas ou favorecidas.
    INSTRUÇÃO TÉCNICA PARA CICLOS EXTERNOS:
    - JÚPITER (O Expansor): Onde a sorte e o crescimento se encontram. Luz: Otimismo, fé. Sombra: Excesso, dogmatismo. Responda: "Onde você tem permissão para crescer hoje?"
    - SATURNO (O Mestre): Onde a disciplina constrói a realidade. Luz: Maturidade, resiliência. Sombra: Medo, rigidez. Responda: "Que estrutura de longo prazo você está sendo chamado a construir?"
    - URANO (O Despertar): Revolução súbita e libertação. Ação: "Como você está sendo convidado a revolucionar sua rotina hoje?"
    - NETUNO (O Visionário): Sonhos, espiritualidade e ilusão. Ação: "Onde você precisa se entregar ao fluxo e onde precisa de limites para não se perder?"
    - PLUTÃO (O Transformador): Morte e renascimento, poder profundo. Ação: "Qual processo de transformação profunda e irreversível você está atravessando?"
    - NÃO DIGA APENAS 'Saturno está em Peixes'. Diga: 'Saturno em Peixes hoje está estruturando suas águas emocionais, pedindo que você dê forma aos seus sonhos mais abstratos'.
    - CONECTE o planeta geracional mais forte do dia com a Carta do Tarot sorteada para criar uma síntese de 'Destino vs. Ação'.
5. CALENDÁRIO LUNAR: Informe a fase da lua de HOJE. Explique qual casa do mapa natal do usuário ela está ativando e o que isso significa (ex: "A Lua Crescente em seu setor financeiro sugere...").
6. TAROT DO DIA: Apresente o arcano do dia sorteado. Descreva seu arquétipo e, o mais importante, correlacione-o com os trânsitos astrológicos mais impactantes que você citou nos pontos 4 e 5.
7. REFLEXÃO ARQUETÍPICA: Conclua com uma frase final curta, poderosa e para meditação, baseada no arquétipo dominante do dia (junção do Tarot e dos trânsitos).
8. ANÁLISE ASTROCARTOGRÁFICA MUNDIAL:
    INSTRUÇÃO DE ASTROCARTOGRAFIA MUNDIAL:
    - IDENTIFIQUE AS LINHAS DE TENSÃO: Analise onde as linhas de Marte, Saturno e Plutão cruzam o mapa mundial do usuário.
    - EMITA ALERTAS E PERIGOS: Onde a linha de Saturno ou Plutão toca o Ascendente (AS), emita um 'Alerta de Sombra' (riscos de saúde, isolamento ou crises profundas). Para Marte, foque em perigo físico, acidentes e conflitos.
    - IDENTIFIQUE LUZ E PROBABILIDADES: Onde a linha de Júpiter ou Vênus toca o Meio do Céu (MC), emita um 'Alerta de Luz' (sucesso profissional, expansão, prosperidade e relacionamentos).
    - GEOPOLÍTICA PESSOAL: Relacione a posição atual dos planetas lentos em trânsito (Urano, Plutão) com a localização geográfica do usuário para prever mudanças súbitas ou transformações no ambiente.

Formate a resposta usando markdown para melhor legibilidade (títulos, negrito, listas).
`;

export async function getOracleAnalysis(input: InterpretNatalChartInput): Promise<InterpretNatalChartOutput> {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: SYSTEM_PROMPT,
    prompt: `Analise os seguintes dados para ${input.userName}:
- Mapa Natal: ${JSON.stringify(input.natalChart)}
- Trânsitos de Hoje: ${JSON.stringify(input.transits)}
- Tarot do Dia: ${input.tarotCard}

Forneça uma análise detalhada e estruturada seguindo o roteiro de 8 passos no formato JSON solicitado.`,
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

    