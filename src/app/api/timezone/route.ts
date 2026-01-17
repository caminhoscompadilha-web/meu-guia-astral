import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const dados = await request.json();
    const { lat, lng, date, time } = dados;

    // REFINAMENTO 1: Filtro de Segurança (Não aceita dados incompletos)
    if (!lat || !lng || !date || !time) {
      return NextResponse.json(
        { erro: 'Dados incompletos. O portal exige precisão total.' },
        { status: 400 }
      );
    }

    // Preparação do tempo neutro
    const tempoNeutro = new Date(`${date}T${time}:00Z`);
    const marcadorSegundos = Math.floor(tempoNeutro.getTime() / 1000);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${marcadorSegundos}&key=${apiKey}`;

    const resposta = await fetch(url);
    const info = await resposta.json();

    if (info.status !== 'OK') {
      return NextResponse.json({ erro: 'Falha na comunicação com o mapa' }, { status: 500 });
    }

    const deslocamentoTotal = info.rawOffset + info.dstOffset;
    const horarioUTC = new Date(tempoNeutro.getTime() - (deslocamentoTotal * 1000));

    // REFINAMENTO 2: Flag de Precisão Ética
    // Se o usuário deixou os minutos em "00", o sistema avisa que é uma estimativa
    const nivelPrecisao = time.endsWith(':00') ? 'ESTIMADA' : 'EXATA';

    // Retorno Final Refinado
    return NextResponse.json({
      fusoId: info.timeZoneId,
      fusoNome: info.timeZoneName,
      diferencaHoras: deslocamentoTotal / 3600,
      utcFinal: horarioUTC.toISOString(),
      precisao: nivelPrecisao, // Avisa se o cálculo é exato ou estimado
      status: "TIME_SYNC_OK"  // Status padronizado para o sistema
    });

  } catch (error) {
    return NextResponse.json({ erro: 'Erro interno no motor' }, { status: 500 });
  }
}