import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Telescope, Sparkles } from "lucide-react";

interface InterpretationDisplayProps {
  interpretation: InterpretNatalChartOutput;
}

export function InterpretationDisplay({ interpretation }: InterpretationDisplayProps) {
  if (!interpretation) {
    return (
       <Card className="bg-card/80 backdrop-blur-sm border-destructive/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-destructive">Erro na Interpretação</CardTitle>
          <CardDescription>Não foi possível carregar a análise da IA.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Aguardando dados da interpretação...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Seu DNA Cósmico</CardTitle>
        <CardDescription>Uma interpretação do seu mapa natal único, feita por IA.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-headline text-lg">
              <Star className="mr-2 h-5 w-5 text-primary" />
              Traços de Personalidade
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {interpretation.personalityTraits}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-headline text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Caminho de Vida e Oportunidades
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {interpretation.lifePathAspects}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-headline text-lg">
              <Telescope className="mr-2 h-5 w-5 text-primary" />
              Forças e Potencial
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {interpretation.potential}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-headline text-lg">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              Análise Planetária Detalhada
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {interpretation.planetaryInterpretations}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
