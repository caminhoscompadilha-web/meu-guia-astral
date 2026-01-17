'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Clock } from 'lucide-react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [horaNascimento, setHoraNascimento] = useState('');
  const [cidadeData, setCidadeData] = useState({ nome: '', lat: null, lng: null });
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      if (autocompleteInputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
          types: ['(cities)'],
          fields: ['geometry', 'formatted_address']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            setCidadeData({
              nome: place.formatted_address || '',
              lat: place.geometry.location.lat() as any,
              lng: place.geometry.location.lng() as any
            });
          }
        });
      }
    });
  }, []);

  const handleGerarMapa = () => {
    if (nome && dataNascimento && horaNascimento && cidadeData.lat) {
      // Aqui os dados estão prontos para o cálculo de Horizonte (-0,83°) e UTC
      console.log("Variáveis Geográficas Capturadas:", cidadeData);
      alert(`Localizado: ${cidadeData.nome}. Pronto para calcular o Horizonte Real.`);
    } else {
      alert('Por favor, preencha todos os campos para garantir a precisão astrológica.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 font-serif flex items-center justify-center">
      <section className="bg-zinc-950 p-8 border border-yellow-600/30 rounded-lg shadow-2xl max-w-2xl w-full">
        <header className="text-center mb-10 border-b border-yellow-600/20 pb-6">
          <h1 className="tracking-[0.4em] text-[10px] text-yellow-600 mb-2">PORTAL MEU GUIA ASTRAL</h1>
          <h2 className="text-3xl font-light tracking-tight italic">Cálculo de Consciência</h2>
        </header>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-yellow-600 mb-2 block">Nome de Batismo</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600 transition-colors" placeholder="Nome Completo" />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-yellow-600 mb-2 block flex items-center gap-2">
              <MapPin size={12} /> Cidade de Nascimento
            </label>
            <input ref={autocompleteInputRef} type="text" className="w-full bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600 transition-colors" placeholder="Busca global de cidades..." />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-yellow-600 mb-2 block">Data</label>
              <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600 transition-colors" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-yellow-600 mb-2 block flex items-center gap-2">
                <Clock size={12} /> Hora Exata
              </label>
              <input type="time" value={horaNascimento} onChange={(e) => setHoraNascimento(e.target.value)} className="w-full bg-transparent border-b border-zinc-800 p-2 outline-none focus:border-yellow-600 transition-colors" />
            </div>
          </div>

          <button onClick={handleGerarMapa} className="w-full mt-10 py-4 border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black font-bold tracking-[0.2em] transition-all text-sm">
            VALIDAR DADOS GEOGRÁFICOS
          </button>
        </div>
      </section>
    </main>
  );
}