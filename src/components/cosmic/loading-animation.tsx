"use client";

import { Sparkles } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-48 h-48 bg-primary/30 rounded-full animate-ping"></div>
        <div className="absolute w-32 h-32 bg-secondary/30 rounded-full animate-ping [animation-delay:-0.5s]"></div>
        <div className="relative bg-background p-6 rounded-full shadow-2xl">
          <Sparkles className="w-16 h-16 text-primary animate-pulse" />
        </div>
      </div>
      <p className="font-headline text-2xl text-foreground mt-8 tracking-wider">
        Gerando seu mapa cósmico...
      </p>
    </div>
  );
}
