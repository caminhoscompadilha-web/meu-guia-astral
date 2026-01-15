
'use client';

export function WidgetCicloLunar({ fase, signo, conselho }: { fase: string, signo: string, conselho: string }) {
  return (
    <div className="bg-slate-900 border border-amber-500/20 p-6 rounded-3xl shadow-xl max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Fase Atual</span>
          <h3 className="text-2xl font-serif text-white">{fase} em {signo}</h3>
        </div>
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-2xl border border-white/10">
          🌙
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-3 bg-black/40 rounded-xl border-l-2 border-amber-500">
          <p className="text-[11px] text-amber-500 font-bold uppercase mb-1">Estratégia de Ação</p>
          <p className="text-xs text-slate-300 leading-relaxed">{conselho}</p>
        </div>
      </div>
    </div>
  );
}
