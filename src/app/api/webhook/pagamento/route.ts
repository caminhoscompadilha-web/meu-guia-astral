
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook para processar eventos de pagamento de provedores como Stripe ou Mercado Pago.
 * Esta rota de API escuta as notificações e libera o acesso premium quando um pagamento é aprovado.
 */
export async function POST(req: NextRequest) {
  try {
    const evento = await req.json();

    console.log("Webhook recebido:", evento);

    // 1. Verificamos se o evento indica um pagamento bem-sucedido.
    // A estrutura do evento varia entre provedores (ex: 'payment.succeeded', 'charge.confirmed', etc.)
    const pagamentoAprovado = 
      evento.type === 'payment_intent.succeeded' || // Exemplo Stripe
      evento.action === 'payment.updated' && evento.data.status === 'approved'; // Exemplo Mercado Pago

    if (pagamentoAprovado) {
      // 2. Extraímos o ID do usuário, que foi enviado na criação da cobrança.
      // No Stripe, fica em `metadata.userId`. No Mercado Pago, em `external_reference`.
      const userId = evento.data.object?.metadata?.userId || evento.data?.external_reference;

      if (!userId) {
        console.error("Erro no Webhook: ID de usuário não encontrado no evento de pagamento.", evento);
        return NextResponse.json({ error: "ID de usuário ausente" }, { status: 400 });
      }

      console.log(`Pagamento aprovado para o usuário: ${userId}. Liberando acesso...`);

      // =========================================================================
      // LÓGICA DE BANCO DE DADOS (Ex: Firebase Firestore) - A SER IMPLEMENTADA
      // Aqui, você atualizaria o documento do usuário para refletir o status de pagamento.
      //
      // Exemplo com Firebase Admin SDK (requer configuração no servidor):
      //
      // import { admin } from '@/lib/firebase-admin';
      // await admin.firestore().collection('usuarios').doc(userId).update({
      //   pago: true,
      //   dataPagamento: new Date(),
      //   plano: 'Premium',
      // });
      //
      // =========================================================================

      console.log(`Sucesso: Acesso liberado para o usuário ${userId}`);
      
      // 4. Respondemos ao provedor de pagamento que o evento foi processado.
      return NextResponse.json({ message: "Acesso liberado com sucesso" }, { status: 200 });
    }

    // Se o evento não for de aprovação de pagamento, apenas confirmamos o recebimento.
    return NextResponse.json({ message: "Evento recebido, mas nenhuma ação necessária" }, { status: 200 });

  } catch (error: any) {
    console.error("Erro crítico no processamento do webhook:", error);
    return NextResponse.json({ error: `Erro interno do servidor: ${error.message}` }, { status: 500 });
  }
}
