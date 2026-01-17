import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { lat, lng, date, time } = await request.json();

    if (!lat || !lng || !date || !time) {
      return NextResponse.json(
        { erro: 'Dados incompletos. O portal exige precisão total.' },
        { status: 400 }
      );
    }

    const localTimeAsUTC = new Date(`${date}T${time}:00Z`);
    const timestamp = Math.floor(localTimeAsUTC.getTime() / 1000);

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { erro: 'A chave da API do Google Maps não foi configurada no servidor.' },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`;

    const response = await fetch(url);
    const timeZoneInfo = await response.json();

    if (timeZoneInfo.status !== 'OK') {
      return NextResponse.json(
        { erro: 'Falha na comunicação com a API de Fuso Horário do Google.', details: timeZoneInfo.error_message || timeZoneInfo.status },
        { status: 500 }
      );
    }

    const totalOffsetInSeconds = timeZoneInfo.rawOffset + timeZoneInfo.dstOffset;
    const utcDate = new Date(localTimeAsUTC.getTime() - (totalOffsetInSeconds * 1000));

    const precisionLevel = time.endsWith(':00') ? 'ESTIMADA' : 'EXATA';

    return NextResponse.json({
      fusoId: timeZoneInfo.timeZoneId,
      fusoNome: timeZoneInfo.timeZoneName,
      diferencaHoras: totalOffsetInSeconds / 3600,
      utcFinal: utcDate.toISOString(),
      precisao: precisionLevel,
      status: "TIME_SYNC_OK"
    });

  } catch (error: any) {
    return NextResponse.json({ erro: 'Erro interno no servidor.', details: error.message }, { status: 500 });
  }
}
