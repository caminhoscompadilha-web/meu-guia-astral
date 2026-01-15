/**
 * @fileOverview This flow is now integrated into interpret-natal-chart.ts to provide a single, unified analysis.
 * This file can be removed or kept for future, more specific transit analyses.
 * For now, it remains as a placeholder.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePlanetaryTransitsInputSchema = z.object({
  userName: z.string(),
  natalChartData: z.any(),
});
export type AnalyzePlanetaryTransitsInput = z.infer<
  typeof AnalyzePlanetaryTransitsInputSchema
>;

// This flow is temporarily simplified as its logic has been merged
// into the main interpretNatalChart flow to create the "Systemic Oracle".
export const analyzePlanetaryTransits = ai.defineFlow(
  {
    name: 'analyzePlanetaryTransits',
    inputSchema: AnalyzePlanetaryTransitsInputSchema,
  },
  async (input) => {
    return "Esta funcionalidade foi integrada à análise principal. Use a interpretação completa para ver os insights sobre os trânsitos.";
  }
);
