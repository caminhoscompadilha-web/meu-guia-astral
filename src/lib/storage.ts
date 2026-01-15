export function salvarConsulta(novaConsulta: any) {
  // 1. Recupera o histórico anterior ou cria um array vazio
  const historicoRaw = localStorage.getItem('historico_astral');
  const historico = historicoRaw ? JSON.parse(historicoRaw) : [];

  // 2. Adiciona a nova consulta com a data atual
  const consultaComData = {
    ...novaConsulta,
    dataConsulta: new Date().toISOString()
  };

  // Mantemos apenas as últimas 5 consultas para não encher a memória
  const novoHistorico = [consultaComData, ...historico].slice(0, 5);

  localStorage.setItem('historico_astral', JSON.stringify(novoHistorico));
}

export function obterUltimaConsulta() {
  const historicoRaw = localStorage.getItem('historico_astral');
  if (!historicoRaw) return null;
  
  const historico = JSON.parse(historicoRaw);
  return historico[0]; // Retorna a consulta mais recente
}