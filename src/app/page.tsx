'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const router = useRouter();

  const handleUnlock = () => {
    if (nome && dataNascimento) {
      const params = new URLSearchParams({ nome, dataNascimento });
      router.push(`/ciclo?${params.toString()}`);
    } else {
      alert('Por favor, preencha seu nome e data de nascimento.');
    }
  };

  return (
    <div className="bg-background text-primary min-h-screen p-10 font-serif flex flex-col items-center justify-center">
      <header className="text-center mb-10">
        <h1 className="tracking-[0.6em] text-sm m-0">PORTAL MEU GUIA ASTRAL</h1>
        <div className="w-[50px] h-px bg-primary my-5 mx-auto" role="presentation" aria-hidden="true"></div>
        <h2 className="text-card-foreground text-3xl font-light">Dossiê de Autoconhecimento</h2>
      </header>
      <main className="max-w-2xl w-full bg-card border border-border p-10 rounded text-center">
        <p className="text-card-foreground leading-[1.8] text-base mb-8">
          'O universo não fala por coincidências, mas por sinais. Descubra a mensagem que as estrelas têm para você.'
        </p>
        <div className="space-y-4 mb-8 text-left">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nome" className="text-card-foreground">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Seu nome de batismo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-input text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="dataNascimento" className="text-card-foreground">Data de Nascimento</Label>
            <Input
              id="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="bg-input text-card-foreground"
            />
          </div>
        </div>
        <Button size="lg" className="font-bold" onClick={handleUnlock}>
          DESBLOQUEAR MEU CICLO (R$ 47,90)
        </Button>
      </main>
    </div>
  );
}
