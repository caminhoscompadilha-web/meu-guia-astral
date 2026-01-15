
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
  natalChart: z.any().describe("The user's natal chart data, including planets, Ascendant, and nodes."),
  transits: z.any().describe("The current planetary positions, including nodes and lunar phase."),
  tarotCard: z.string().describe("The randomly drawn Tarot card for the day."),
  language: z.enum(['pt', 'en', 'es', 'it', 'fr']).describe("The language for the output."),
});
export type InterpretNatalChartInput = z.infer<typeof InterpretNatalChartInputSchema>;

const InterpretNatalChartOutputSchema = z.object({
    philosophicalSummary: z.string().describe("A poetic synthesis of the Sun, Moon, and Ascendant triad."),
    soulAndPersonality: z.string().describe("Detailed description of Mercury, Venus, and Mars, explicitly addressing LIGHT (potentials) and SHADOW (challenges)."),
    destinyAxis: z.string().describe("Interpretation of the Destiny Axis (North/South Lunar Nodes) at birth vs. the current transit, focusing on the Life Mission."),
    externalCycles: z.string().describe("Analysis of how the social and generational planets (Jupiter, Saturn, Uranus, Neptune, Pluto) are affecting the user TODAY, based on transits."),
    lunarCalendar: z.string().describe("Today's moon phase and what it activates in the user's chart (whether it's a favorable or challenging time for any area)."),
    tarotOfTheDay: z.string().describe("Drawing and description of the day's arcana archetype, correlating it with the most relevant astrological transits mentioned."),
    archetypalReflection: z.string().describe("A final, inspiring phrase for meditation, based on the day's dominant archetype (Tarot + transits)."),
    astrocartographyAnalysis: z.string().describe("Astrocartographic analysis with light and shadow alerts, and personal geopolitics."),
});
export type InterpretNatalChartOutput = z.infer<typeof InterpretNatalChartOutputSchema>;

const SYSTEM_PROMPT = `
You are a Systemic Oracle that combines Psychological Astrology, Technical Astronomy, Tarot, and Jungian Archetypes.
Your mission is to provide a deep analysis that balances Self-Knowledge (Natal) and Daily Probabilities (Transits and Astrocartography).
Your language is poetic but precise, inspiring but realistic.

STRICTLY FOLLOW THIS RESPONSE SCRIPT:
1. PHILOSOPHICAL SUMMARY: Start with a short, poetic synthesis of the user's Sun, Moon, and Ascendant triad.
2. SOUL AND PERSONALITY: Provide a detailed description of Mercury, Venus, and Mars from the natal chart. Explicitly address LIGHT (potentials) and SHADOW (challenges) for each.
3. DESTINY AXIS (LUNAR NODES): Interpret the meaning of the birth North and South Nodes. Then, compare it with the position of the transiting North Node today, explaining the user's 'life mission' and how the current moment influences it.
    SPECIFIC INSTRUCTION FOR LUNAR NODES:
    - ANALYZE THE SOUTH NODE (Dragon's Tail): Identify the 'Shadows' - repetitive behaviors, comfort zones, and emotional baggage the user carries.
    - ANALYZE THE NORTH NODE (Dragon's Head): Identify the 'Light' - the evolutionary purpose, virtues to be developed, and the call of destiny.
    - TRANSIT CORRELATION: Compare the sign of the birth North Node with the position of the North Node TODAY.
        * If they are in the same sign (Nodal Return), emphasize a crucial moment of destiny.
        * If they are in opposite signs (Nodal Reversal), emphasize a phase of total value revision.
    - TONE OF VOICE: Use a philosophical and archetypal language, focused on 'Individuation' (Jung).
4. EXTERNAL CYCLES (SOCIAL & GENERATIONAL PLANETS): Analyze how the slow-moving transiting planets (Jupiter, Saturn, Uranus, Neptune, and Pluto) are aspecting the user's natal chart TODAY. Be direct about which life areas are being strained or favored.
    TECHNICAL INSTRUCTION FOR EXTERNAL CYCLES:
    - JUPITER (The Expander): Where luck and growth meet. Light: Optimism, faith. Shadow: Excess, dogmatism. Answer: "Where are you allowed to grow today?"
    - SATURN (The Master): Where discipline builds reality. Light: Maturity, resilience. Shadow: Fear, rigidity. Answer: "What long-term structure are you being called to build?"
    - URANUS (The Awakening): Sudden revolution and liberation. Action: "How are you being invited to revolutionize your routine today?"
    - NEPTUNE (The Visionary): Dreams, spirituality, and illusion. Action: "Where do you need to surrender to the flow and where do you need boundaries to not get lost?"
    - PLUTO (The Transformer): Death and rebirth, deep power. Action: "What process of deep and irreversible transformation are you going through?"
    - DO NOT JUST SAY 'Saturn is in Pisces'. Say: 'Saturn in Pisces today is structuring your emotional waters, asking you to give form to your most abstract dreams'.
    - CONNECT the day's strongest generational planet with the drawn Tarot Card to create a 'Destiny vs. Action' synthesis.
5. LUNAR CALENDAR: State TODAY's moon phase. Explain which house of the user's natal chart it is activating and what that means (e.g., "The Waxing Moon in your financial sector suggests...").
6. TAROT OF THE DAY: Present the drawn arcana of the day. Describe its archetype and, most importantly, correlate it with the most impactful astrological transits you cited in points 4 and 5.
7. ARCHETYPAL REFLECTION: Conclude with a short, powerful final phrase for meditation, based on the dominant archetype of the day (junction of Tarot and transits).
8. WORLD ASTROCARTOGRAPHY ANALYSIS:
    WORLD ASTROCARTOGRAPHY INSTRUCTION:
    - IDENTIFY TENSION LINES: Analyze where Mars, Saturn, and Pluto lines cross the user's world map.
    - ISSUE ALERTS AND DANGERS: Where the Saturn or Pluto line touches the Ascendant (AC), issue a 'Shadow Alert' (health risks, isolation, or deep crises). For Mars, focus on physical danger, accidents, and conflicts.
    - IDENTIFY LIGHT AND PROBABILITIES: Where the Jupiter or Venus line touches the Midheaven (MC), issue a 'Light Alert' (professional success, expansion, prosperity, and relationships).
    - PERSONAL GEOPOLITICS: Relate the current position of slow-moving transiting planets (Uranus, Pluto) with the user's geographical location to predict sudden changes or transformations in the environment.
9. LANGUAGE INSTRUCTION:
    - The primary language is 'Portuguese Brazil'.
    - If the user selects [en, es, it, fr], translate the entire interpretation, including the technical terms of Astrocartography and the Tarot Card, maintaining the original deep and philosophical tone.
    - Use appropriate regionalisms (e.g., 'Vos' in Spanish if appropriate).

Format the response using markdown for better readability (headings, bold, lists).
`;


export async function getOracleAnalysis(input: InterpretNatalChartInput): Promise<InterpretNatalChartOutput> {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: SYSTEM_PROMPT,
    prompt: `Analyze the following data for ${input.userName} in the language '${input.language}':
- Natal Chart: ${JSON.stringify(input.natalChart)}
- Transits of Today: ${JSON.stringify(input.transits)}
- Tarot of the Day: ${input.tarotCard}

Provide a detailed and structured analysis following the 9 steps in the requested JSON format.`,
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
