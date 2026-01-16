'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-10 font-serif">
      <header className="mb-10 text-center">
        <h1 className="text-sm uppercase tracking-[0.6em] text-primary">Portal Meu Guia Astral</h1>
        <div className="mx-auto my-5 h-px w-12 bg-primary"></div>
        <h2 className="text-3xl font-light text-white">Dossiê de Autoconhecimento</h2>
      </header>
      <main className="w-full max-w-2xl rounded-lg border border-border bg-card p-10 text-center text-card-foreground">
        <p className="mb-8 text-base leading-relaxed">
          'O universo não fala por coincidências, mas por sinais. Sob a regência de Marte, sua vontade é forjada no ferro e no silêncio.'
        </p>
        <button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-10 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          DESBLOQUEAR MEU CICLO (R$ 47,90)
        </button>
      </main>
    </div>
  );
}
