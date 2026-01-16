'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10">
      <header className="mb-10 text-center">
        <h1 className="m-0 text-sm tracking-[0.6em]">PORTAL MEU GUIA ASTRAL</h1>
        <div className="mx-auto my-5 h-[1px] w-[50px] bg-[#D4AF37]"></div>
        <h2 className="text-3xl font-light text-white">Dossiê de Autoconhecimento</h2>
      </header>
      <main className="max-w-[600px] rounded border border-[#332b1a] bg-[#0a0a0a] p-10 text-center">
        <p className="mb-[30px] text-base leading-[1.8] text-[#ccc]">
          'O universo não fala por coincidências, mas por sinais. Sob a regência de Marte, sua vontade é forjada no ferro e no silêncio.'
        </p>
        <button className="cursor-pointer border-none bg-[#D4AF37] px-10 py-[15px] text-sm font-bold text-black">
          DESBLOQUEAR MEU CICLO (R$ 47,90)
        </button>
      </main>
    </div>
  );
}
