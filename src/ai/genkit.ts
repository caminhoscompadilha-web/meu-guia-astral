import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({ 
      // Tenta pegar a chave de qualquer variável disponível
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY 
    }),
  ],
});
