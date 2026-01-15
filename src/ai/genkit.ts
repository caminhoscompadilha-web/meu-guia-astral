import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// ATENÇÃO: A chave da API é a causa provável de erros 400.
// Siga as instruções abaixo com atenção.

// 1. Tenta carregar a chave da API a partir das variáveis de ambiente.
let apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// DEBUG: Imprime os 4 primeiros caracteres da chave para verificar se foi carregada.
// Se aparecer "unde" ou "Sua_", a variável de ambiente não foi lida corretamente.
console.log(`DEBUG: Os 4 primeiros dígitos da chave da API são: ${apiKey?.substring(0, 4)}`);

// 2. Se a chave não for encontrada no ambiente, use um valor placeholder.
//    Isso evita que o app quebre na inicialização, mas causará um erro 400 na chamada da API.
//    Para o aplicativo funcionar, você DEVE substituir a string abaixo pela sua chave real.
if (!apiKey || apiKey.startsWith('Sua_Chave')) {
  apiKey = "Sua_Chave_Aqui_Sem_Aspas";
  console.warn("⚠️ AVISO: A chave da API do Gemini não foi definida corretamente. Usando valor placeholder. Isso resultará em um erro 400. Por favor, insira sua chave real no arquivo .env e reinicie o servidor, ou substitua o placeholder neste arquivo.");
}


export const ai = genkit({
  plugins: [
    googleAI({ apiKey: apiKey }),
  ],
});
