
'use client';

export function BloqueioPremium({ pago, aoClicar }: { pago: boolean, aoClicar: () => void }) {
  if (pago) return null; // Se pagou, o bloqueio some

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md rounded-3xl border border-purple-500/30 text-center">
      <div className="w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">🔐</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Conteúdo Restrito</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-xs">
        Seus Alertas de Perigo e Remédios Astrológicos estão ocultos. Desbloqueie para visualizar e receber no seu e-mail.
      </p>
      <button 
        onClick={aoClicar}
        className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform text-white"
      >
        Liberar com Pix ou Cartão
      </button>
    </div>
  );
}
