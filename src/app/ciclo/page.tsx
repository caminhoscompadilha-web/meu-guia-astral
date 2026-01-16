import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { gerarDossieCosmico } from '@/ai/flows/dossie-cosmico-flow';

type CicloPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function DossieContent({ nome, dataNascimento }: { nome: string; dataNascimento: string }) {
  const dossie = await gerarDossieCosmico({ nome, dataNascimento });
  const paragraphs = dossie.dossie.split('\n').filter(p => p.trim() !== '');

  return (
    <>
      <header className="text-center mb-10">
        <h1 className="tracking-[0.6em] text-sm m-0">SEU CICLO ASTROLÓGICO</h1>
        <div className="w-[50px] h-px bg-primary my-5 mx-auto" role="presentation" aria-hidden="true"></div>
        <h2 className="text-card-foreground text-3xl font-light">{dossie.titulo}</h2>
      </header>
      <main className="max-w-4xl w-full">
        <Card className="bg-card border-border p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">Seu Dossiê Cósmico</CardTitle>
          </CardHeader>
          <CardContent className="text-card-foreground leading-[1.8] text-base space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline">VOLTAR AO PORTAL</Button>
          </Link>
        </div>
      </main>
    </>
  );
}

function LoadingSkeleton() {
    return (
        <>
            <header className="text-center mb-10">
                <h1 className="tracking-[0.6em] text-sm m-0">SEU CICLO ASTROLÓGICO</h1>
                <div className="w-[50px] h-px bg-primary my-5 mx-auto" role="presentation" aria-hidden="true"></div>
                <h2 className="text-card-foreground text-3xl font-light animate-pulse bg-muted h-9 w-1/2 mx-auto rounded"></h2>
            </header>
            <main className="max-w-4xl w-full">
                <Card className="bg-card border-border p-6">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl text-primary">Gerando seu Dossiê Cósmico...</CardTitle>
                    </CardHeader>
                    <CardContent className="text-card-foreground leading-[1.8] text-base space-y-6">
                        <div className="space-y-3">
                            <div className="h-4 bg-muted rounded animate-pulse"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        </div>
                         <div className="space-y-3">
                            <div className="h-4 bg-muted rounded animate-pulse"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        </div>
                         <div className="space-y-3">
                            <div className="h-4 bg-muted rounded animate-pulse"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        </div>
                    </CardContent>
                </Card>
                <div className="text-center mt-8">
                    <Link href="/">
                        <Button variant="outline">VOLTAR AO PORTAL</Button>
                    </Link>
                </div>
            </main>
        </>
    );
}
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-noite-profunda text-white p-4">
      <section className="bg-noite-profunda p-8 border border-dourado-luxo/30 rounded-lg shadow-2xl max-w-4xl mx-auto">
        {/* Frase de Boas-vindas Aprovada */}
        <h1 className="titulo-mistico text-2xl text-center mb-8 text-dourado-luxo">
          O universo não fala por coincidências, mas por sinais. <br/>
          Descubra a mensagem que o Céu e as Energias têm para você.
        </h1>

        <div className="bg-black/40 border border-dourado-luxo/20 p-8 rounded-xl shadow-2xl">
          <h2 className="titulo-mistico text-xl mb-6 text-center text-dourado-luxo">Organizar o Céu de Nascimento</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-dourado-luxo text-xs uppercase mb-1">Cidade e Estado</label>
              <input type="text" placeholder="Ex: Belo Horizonte, MG" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white outline-none" />
              <p className="text-[10px] text-gray-500 mt-1 italic">Convertendo para coordenadas reais (Lat/Long)...</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-dourado-luxo text-xs uppercase mb-1">Data</label>
                <input type="date" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white" />
              </div>
              <div>
                <label className="block text-dourado-luxo text-xs uppercase mb-1">Hora Exata (24h)</label>
                <input type="time" className="w-full bg-black/50 border border-dourado-luxo/20 p-3 text-white" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-roxo-místico/10 border border-roxo-místico/30 rounded">
              <input type="checkbox" className="mt-1" id="nao-sei-hora" />
              <label htmlFor="nao-sei-hora" className="text-xs text-gray-400">
                Não sei o meu horário de nascimento. <br/>
                <span className="text-dourado-luxo/70 font-bold italic">
                  * O sistema assumirá 12:00h e gerará um Mapa de Essência (Casas estimadas).
                </span>
              </label>
            </div>

            <button type="button" className="w-full mt-4 py-4 font-bold tracking-widest border border-dourado-luxo text-dourado-luxo hover:bg-dourado-luxo hover:text-black transition-all">
              GERAR MAPA DE CONSCIÊNCIA
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
