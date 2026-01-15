
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/components/Header';

export default function LandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    hora: '',
    idioma: 'pt' // Idioma padrão
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salva os dados na memória do navegador para o Dashboard ler
    localStorage.setItem('user_astral_data', JSON.stringify(formData));
    
    // Redireciona para o Dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-purple-500/30">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-purple-400 uppercase bg-purple-950/30 border border-purple-800/50 rounded-full">
          Sua bússola astral com inteligência artificial
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
          Descubra o seu <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Propósito Universal
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg text-slate-400 mb-12">
          Uma jornada profunda através da Astrologia Psicológica, Astrocartografia e Tarot. 
          Gere seu mapa gratuitamente, mas adquira o <strong>Relatório Premium</strong> para desbloquear Alertas de Sombra e o envio detalhado para seu e-mail.
        </p>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
             <div className="max-w-md mx-auto bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
          <h3 className="text-xl font-semibold mb-6">Comece sua jornada grátis</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs uppercase text-slate-500 font-bold ml-1">Nome Completo</label>
              <input 
                required
                type="text" 
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Como devemos te chamar?" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold ml-1">Data</label>
                <input 
                  required
                  type="date" 
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold ml-1">Hora</label>
                <input 
                  required
                  type="time" 
                  value={formData.hora}
                  onChange={(e) => setFormData({...formData, hora: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all" 
                />
              </div>
            </div>

             <div>
              <label className="text-xs uppercase text-slate-500 font-bold ml-1">Idioma do Guia</label>
              <select 
                value={formData.idioma}
                onChange={(e) => setFormData({...formData, idioma: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all text-slate-300"
              >
                <option value="pt">Português 🇧🇷</option>
                <option value="en">English 🇺🇸</option>
                <option value="es">Español 🇪🇸</option>
                <option value="it">Italiano 🇮🇹</option>
                <option value="fr">Français 🇫🇷</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.02]">
              Gerar Meu Guia Agora
            </button>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
}
