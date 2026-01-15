
export interface TarotCard {
  id: number;
  name: string;
  archetype: string;
}

// Foco nos 22 Arcanos Maiores para esta versão
const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "O Louco", archetype: "Inocência, novos começos, espontaneidade, risco." },
  { id: 1, name: "O Mago", archetype: "Poder, habilidade, concentração, ação, manifestação." },
  { id: 2, name: "A Sacerdotisa", archetype: "Intuição, subconsciente, mistério, segredos." },
  { id: 3, name: "A Imperatriz", archetype: "Fertilidade, feminilidade, beleza, natureza, abundância." },
  { id: 4, name: "O Imperador", archetype: "Autoridade, estrutura, controle, poder paterno." },
  { id: 5, name: "O Hierofante", archetype: "Tradição, religião, conformidade, instituições." },
  { id: 6, name: "Os Amantes", archetype: "Amor, harmonia, relacionamentos, valores, escolhas." },
  { id: 7, name: "O Carro", archetype: "Controle, vontade, vitória, asserção, determinação." },
  { id: 8, name: "A Força", archetype: "Coragem, paciência, controle, compaixão." },
  { id: 9, name: "O Eremita", archetype: "Introspecção, busca, orientação, solidão." },
  { id: 10, name: "A Roda da Fortuna", archetype: "Destino, ciclos, mudança, sorte, karma." },
  { id: 11, name: "A Justiça", archetype: "Justiça, equidade, verdade, causa e efeito, lei." },
  { id: 12, name: "O Enforcado", archetype: "Suspensão, novas perspectivas, sacrifício, rendição." },
  { id: 13, name: "A Morte", archetype: "Fim, transformação, transição, mudança." },
  { id: 14, name: "A Temperança", archetype: "Equilíbrio, moderação, paciência, propósito." },
  { id: 15, name: "O Diabo", archetype: "Vício, materialismo, tentação, escravidão." },
  { id: 16, name: "A Torre", archetype: "Caos, revelação, despertar, destruição súbita." },
  { id: 17, name: "A Estrela", archetype: "Esperança, fé, propósito, renovação, espiritualidade." },
  { id: 18, name: "A Lua", archetype: "Ilusão, medo, ansiedade, subconsciente, intuição." },
  { id: 19, name: "O Sol", archetype: "Sucesso, vitalidade, alegria, clareza, otimismo." },
  { id: 20, name: "O Julgamento", archetype: "Renascimento, chamado interior, absolvição, despertar." },
  { id: 21, name: "O Mundo", archetype: "Realização, integração, conclusão, viagem." },
];

/**
 * Sorteia uma carta aleatória dos Arcanos Maiores.
 */
export function drawTarotCard(): TarotCard {
  const randomIndex = Math.floor(Math.random() * MAJOR_ARCANA.length);
  return MAJOR_ARCANA[randomIndex];
}
