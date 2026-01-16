'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="bg-background text-primary min-h-screen p-10 font-serif flex flex-col items-center justify-center">
      <header className="text-center mb-10">
        <h1 className="tracking-[0.6em] text-sm m-0">PORTAL MEU GUIA ASTRAL</h1>
        <div className="w-[50px] h-px bg-primary my-5 mx-auto"></div>
        <h2 className="text-card-foreground text-3xl font-light">Dossiê de Autoconhecimento</h2>
      </header>
      <main className="max-w-2xl bg-card border border-border p-10 rounded text-center">
        <p className="text-card-foreground leading-[1.8] text-base mb-[30px]">
          'O universo não fala por coincidências, mas por sinais. Sob a regência de Marte, sua vontade é forjada no ferro e no silêncio.'
        </p>
        <button className="bg-primary text-primary-foreground py-[15px] px-10 font-bold cursor-pointer text-sm rounded">
          DESBLOQUEAR MEU CICLO (R$ 47,90)
        </button>
      </main>
    </div>
  );
}
