import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// ATENÇÃO: A chave da API é a causa provável de erros 400.
// Siga as instruções abaixo com atenção.

// 1. Tenta carregar a chave da API a partir das variáveis de ambiente.
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// 2. Se a chave não for encontrada no ambiente, o plugin do GoogleAI irá falhar.
//    Certifique-se de que seu arquivo .env.local está na raiz do projeto e contém:
//    GEMINI_API_KEY=SuaChaveAquiSemAspas
if (!apiKey) {
  console.error("ERRO CRÍTICO: Nenhuma chave de API do Gemini foi encontrada. Verifique seu arquivo .env.local e reinicie o servidor.");
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: apiKey }),
  ],
});
