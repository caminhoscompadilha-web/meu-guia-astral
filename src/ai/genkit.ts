import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // ATENÇÃO: A chave da API foi inserida diretamente aqui como último recurso
      // para superar um problema de carregamento de ambiente.
      // Substitua "Sua_Chave_Aqui_Sem_Aspas" pela sua chave real.
      // Para produção, o ideal é voltar a usar variáveis de ambiente.
      apiKey: 'Sua_Chave_Aqui_Sem_Aspas',
    }),
  ],
  // O model default será usado se não for especificado em outro lugar.
  // Você pode remover esta linha se cada fluxo/prompt especificar seu próprio modelo.
  model: 'googleai/gemini-pro',
});
