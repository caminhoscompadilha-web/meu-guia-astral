import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { config } from 'dotenv';

config();

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
  // O model default será usado se não for especificado em outro lugar.
  // Você pode remover esta linha se cada fluxo/prompt especificar seu próprio modelo.
  model: 'googleai/gemini-pro',
});
