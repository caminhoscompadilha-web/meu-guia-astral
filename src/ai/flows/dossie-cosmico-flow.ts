'use server';
/**
 * @fileOverview Generates a personalized "Cosmic Dossier" based on user's name and birthdate.
 *
 * - gerarDossieCosmico - A function that handles the dossier generation process.
 * - DossieCosmicoInput - The input type for the gerarDossieCosmico function.
 * - DossieCosmicoOutput - The return type for the gerarDossieCosmico function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DossieCosmicoInputSchema = z.object({
  nome: z.string().describe('The name of the person.'),
  dataNascimento: z.string().describe('The birth date of the person (e.g., YYYY-MM-DD).'),
});
export type DossieCosmicoInput = z.infer<typeof DossieCosmicoInputSchema>;

const DossieCosmicoOutputSchema = z.object({
  titulo: z.string().describe("The title of the dossier, for example 'O Despertar de Marte'."),
  dossie: z.string().describe("The full cosmic dossier text, written in a mystical and astrological style. It should have at least 3 paragraphs."),
});
export type DossieCosmicoOutput = z.infer<typeof DossieCosmicoOutputSchema>;

export async function gerarDossieCosmico(input: DossieCosmicoInput): Promise<DossieCosmicoOutput> {
  return dossieCosmicoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dossieCosmicoPrompt',
  input: { schema: DossieCosmicoInputSchema },
  output: { schema: DossieCosmicoOutputSchema },
  prompt: `Você é um astrólogo místico, um guardião de segredos cósmicos. Seu nome é Aethelred.

Sua tarefa é criar um "Dossiê Cósmico" para uma pessoa chamada {{{nome}}}, nascida em {{{dataNascimento}}}.

O dossiê deve ser escrito em um tom poético, misterioso e profundo, revelando uma suposta jornada astral única para a pessoa. Use a data de nascimento para inferir um "ciclo astrológico" fictício dominante (como o 'Ciclo do Guerreiro', 'A Sombra de Saturno', 'A Ascensão de Vênus', etc.) e baseie o texto nisso.

O texto deve ser inspirador, mas com um toque de advertência sobre 'sombras' ou 'desafios' a serem superados.

Estruture sua resposta estritamente com um título e o texto do dossiê.
O texto do dossiê deve conter pelo menos 3 parágrafos.
Não inclua saudações ou qualquer texto que não seja o título e o dossiê.
O idioma é Português do Brasil.`,
});

const dossieCosmicoFlow = ai.defineFlow(
  {
    name: 'dossieCosmicoFlow',
    inputSchema: DossieCosmicoInputSchema,
    outputSchema: DossieCosmicoOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('A inteligência artificial não conseguiu gerar o dossiê.');
    }
    return output;
  }
);
