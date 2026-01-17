import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🔥 ROTA TIMEZONE GET ATIVA');
  return NextResponse.json({ ok: true });
}
