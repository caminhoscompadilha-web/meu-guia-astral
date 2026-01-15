
'use client'
import { useState } from 'react';

export function ModalPagamento({ aberto, aoFechar }: { aberto: boolean, aoFechar: () => void }) {
  const [metodo, setMetodo] = useState<'pix' | 'cartao'>('pix');

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Header do Modal */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Finalizar meu Guia</h3>
          <button onClick={aoFechar} className="text-slate-500 hover:text-white transition-colors">✕</button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setMetodo('pix')}
              className={`flex-1 py-3 rounded-xl border-2 transition-all ${metodo === 'pix' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-700 hover:bg-slate-800'}`}
            >
              <span className="block text-sm font-bold">PIX</span>
              <span className="text-[10px] opacity-60 italic">Liberação instantânea</span>
            </button>
            <button 
              onClick={() => setMetodo('cartao')}
              className={`flex-1 py-3 rounded-xl border-2 transition-all ${metodo === 'cartao' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-700 hover:bg-slate-800'}`}
            >
              <span className="block text-sm font-bold">Cartão</span>
              <span className="text-[10px] opacity-60 italic">Até 12x</span>
            </button>
          </div>

          {/* Área do Pix */}
          {metodo === 'pix' && (
            <div className="text-center animate-in fade-in zoom-in-50 duration-300">
              <div className="bg-white p-4 inline-block rounded-2xl mb-4">
                {/* Placeholder para o QR Code real */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PortalMeuGuiaAstralPix" alt="QR Code Pix" />
              </div>
              <p className="text-sm text-slate-400 mb-4">Escaneie o QR Code ou copie o código abaixo:</p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-2 mb-6">
                <code className="text-[10px] text-purple-400 truncate">00020126580014BR.GOV.BCB.PIX0136...</code>
                <button className="text-xs bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-500 transition-colors">Copiar</button>
              </div>
            </div>
          )}

          {/* Área do Cartão (Simulada) */}
          {metodo === 'cartao' && (
            <div className="space-y-4 animate-in fade-in zoom-in-50 duration-300">
              <input type="text" placeholder="Número do Cartão" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-purple-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/AA" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-purple-500" />
                <input type="text" placeholder="CVV" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-purple-500" />
              </div>
            </div>
          )}

          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl mt-4 shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
            {metodo === 'pix' ? 'Já realizei o Pix' : 'Confirmar Pagamento'}
          </button>
          
          <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">
            🛡️ Transação Segura • Portal Meu Guia Astral
          </p>
        </div>
      </div>
    </div>
  );
}
