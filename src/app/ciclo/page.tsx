'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CicloPage() {
  return (
    <div className="bg-background text-primary min-h-screen p-10 font-serif flex flex-col items-center justify-center">
      <header className="text-center mb-10">
        <h1 className="tracking-[0.6em] text-sm m-0">SEU CICLO ASTROLÓGICO</h1>
        <div className="w-[50px] h-px bg-primary my-5 mx-auto" role="presentation" aria-hidden="true"></div>
        <h2 className="text-card-foreground text-3xl font-light">O Despertar de Marte</h2>
      </header>
      <main className="max-w-4xl w-full">
        <Card className="bg-card border-border p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">Seu Dossiê Cósmico</CardTitle>
          </CardHeader>
          <CardContent className="text-card-foreground leading-[1.8] text-base space-y-6">
            <p>
              A sua jornada astral atual é dominada pela energia incisiva de Marte. Este período, conhecido como o Ciclo do Guerreiro, marca um tempo de ação, coragem e confrontação. A influência marciana impele-o a quebrar barreiras, tanto internas como externas, e a forjar o seu destino com a força da sua vontade.
            </p>
            <p>
              Durante esta fase, sentirá um aumento na sua energia física e mental. A procrastinação dá lugar à iniciativa. É o momento ideal para iniciar novos projetos, defender as suas convicções e lutar por aquilo em que acredita. No entanto, o Guerreiro deve ter cuidado para não deixar que a impulsividade se transforme em agressão. O verdadeiro poder reside no controlo e na aplicação disciplinada da força.
            </p>
            <p>
              A sua sombra neste ciclo é a impaciência. O silêncio e a estratégia são tão importantes quanto a ação. Aprenda a observar antes de atacar, a ouvir antes de falar. A forja do seu espírito requer não apenas o fogo da paixão, mas também a água fria da contemplação.
            </p>
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline">VOLTAR AO PORTAL</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
