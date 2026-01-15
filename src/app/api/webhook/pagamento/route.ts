
import { type NextRequest, NextResponse } from "next/server";

// Aqui você importaria as configurações do seu Firebase Admin futuramente
// import { db } from '@/lib/firebaseAdmin'; 

export async function POST(request: Request) {
  try {
    const corpo = await request.json();

    // Lógica para Mercado Pago ou Stripe
    // external_reference é o ID do usuário que enviamos na hora de gerar o Pix
    const status = corpo.status || corpo.type;
    const userId = corpo.external_reference || corpo.data?.id; 

    if (status === 'approved' || status === 'payment.succeeded') { // Ajustado para Stripe
      console.log(`💰 Pagamento confirmado para o usuário: ${userId}`);

      /* AQUI CONECTAMOS COM O FIRESTORE NO FUTURO:
      await db.collection('usuarios').doc(userId).update({
        pago: true,
        plano: 'Premium',
        dataPagamento: new Date().toISOString()
      });
      */

      // Disparar e-mail de confirmação aqui

      return NextResponse.json({ message: "Acesso Liberado" }, { status: 200 });
    }

    return NextResponse.json({ message: "Evento recebido, mas sem ação necessária" }, { status: 200 });

  } catch (error: any) {
    console.error("Erro no Webhook:", error.message);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
