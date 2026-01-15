import {genkit} from 'genkit';
import {googleAI, gemini15Flash} from '@genkit-ai/google-genai';

// ATENÇÃO: A chave da API foi inserida diretamente aqui como último recurso
// para superar um problema de carregamento de ambiente no Firebase Studio.
//
// Para que o aplicativo funcione, substitua a string "Sua_Chave_Aqui_Sem_Aspas"
// pela sua chave de API real do Google AI Studio (Gemini).
//
// Para um aplicativo em produção real, o ideal seria voltar a usar variáveis
// de ambiente, mas para este ambiente de desenvolvimento, esta é a solução.
const apiKey = "Sua_Chave_Aqui_Sem_Aspas";

if (!apiKey || apiKey === "Sua_Chave_Aqui_Sem_Aspas") {
  console.warn("⚠️ AVISO: A chave da API do Gemini não foi definida em src/ai/genkit.ts. O aplicativo não funcionará. Por favor, insira sua chave.");
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: apiKey }),
  ],
  // O model default será usado se não for especificado em outro lugar.
  model: gemini15Flash,
});
