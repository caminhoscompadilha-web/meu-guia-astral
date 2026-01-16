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

export default function CicloPage({ searchParams }: CicloPageProps) {
  const nome = searchParams?.nome as string;
  const dataNascimento = searchParams?.dataNascimento as string;

  if (!nome || !dataNascimento) {
    return (
      <div className="bg-background text-primary min-h-screen p-10 font-serif flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl text-destructive mb-4">Dados incompletos.</h1>
        <p className="text-card-foreground mb-8">Por favor, volte ao portal e forneça seu nome e data de nascimento.</p>
        <Link href="/">
          <Button variant="outline">VOLTAR AO PORTAL</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-primary min-h-screen p-10 font-serif flex flex-col items-center justify-center">
      <Suspense fallback={<LoadingSkeleton />}>
        <DossieContent nome={nome} dataNascimento={dataNascimento} />
      </Suspense>
    </div>
  );
}
