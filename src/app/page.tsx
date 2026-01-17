'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Globe } from 'lucide-react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [horaNascimento, setHoraNascimento] = useState('');
  const [cidadeData, setCidadeData] = useState<{nome: string, lat: number | null, lng: number | null}>({ 
    nome: '', 
    lat: null, 
    lng: null 
  });
  const [fusoInfo, setFusoInfo] = useState<string | null>(null);
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) { initAutocomplete(); return; }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);

    function initAutocomplete() {
      // @ts-ignore
      if (!autocompleteInputRef.current || !window.google) return;
      // @ts-ignore
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current, { types: ['(cities)'], fields: ['geometry', 'formatted_address'] }
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          setCidadeData({
            nome: place.formatted_address || '',
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });
    }
  }, []);

  // ESTA É A FUNÇÃO QUE CONECTA COM O SEU BACKEND
  const sincronizarTempoUTC = async () => {
    if (!cidadeData.lat || !cidadeData.lng || !dataNascimento || !horaNascimento) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch('/api/timezone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: cidadeData.lat,
          lng: cidadeData.lng,
          date: dataNascimento,
          time: horaNascimento
        }),
      });

      const data = await res.json();

      if (data.utc) {
        setFusoInfo(`${data.timezoneName} (UTC ${data.offset}h)`);
        alert(`Sincronizado via Backend!\nUTC Gerado: ${data.utc}`);
      } else {
        alert("O servidor não conseguiu calcular o tempo.");
      }
    } catch (e) {
      alert("Erro ao conectar com o servidor de fuso horário.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 font-serif flex items-center justify-center">
      <section className="bg-zinc-950 p-8 border border-yellow-600/30 rounded-lg shadow-2xl max-w-2xl w-full">
        <header className="text-center mb-10 border-b border-yellow-600/20 pb-6">
          <h1 className="tracking-[0.4em] text-[10px] text-yellow-600 mb-2 font-bold uppercase">Portal Meu Guia Astral</h1>
          <h2 className="text-3xl font-light tracking-tight italic text-yellow-100">Cálculo de Consciência</h2>
        </header>

        <div className="space-y-6">
          <input 
            type="text" 
            placeholder="Nome de Batismo" 
            value={nome} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} 
            className="w-full bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600" 
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-yellow-600 flex items-center gap-2"><MapPin size={12}/> Local de Nascimento</label>
            <input 
              ref={autocompleteInputRef} 
              type="text" 
              placeholder="Digite sua cidade..." 
              className="w-full bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600" 
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <input 
              type="date" 
              value={dataNascimento} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataNascimento(e.target.value)} 
              className="bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600" 
            />
            <input 
              type="time" 
              value={horaNascimento} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHoraNascimento(e.target.value)} 
              className="bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600" 
            />
          </div>

          <button onClick={sincronizarTempoUTC} className="w-full mt-6 py-4 border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black font-bold tracking-[0.2em] transition-all text-sm flex items-center justify-center gap-2 uppercase">
            <Globe size={16} /> Sincronizar Tempo Universal
          </button>

          {fusoInfo && <p className="text-[10px] text-center text-zinc-500 mt-4 italic">{fusoInfo}</p>}
        </div>
      </section>
    </main>
  );
}