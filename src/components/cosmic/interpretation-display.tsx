import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Telescope, Sparkles, Wand2, GitCommit, Moon, Dna } from "lucide-react";

interface InterpretationDisplayProps {
  interpretation: InterpretNatalChartOutput;
}

const Section = ({ icon, title, content, value }: { icon: React.ReactNode, title: string, content: string, value: string }) => (
    <AccordionItem value={value}>
        <AccordionTrigger className="font-headline text-lg">
            {icon}
            {title}
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {content}
        </AccordionContent>
    </AccordionItem>
);


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
        <CardTitle className="font-headline text-2xl">Seu Oráculo Sistêmico</CardTitle>
        <CardDescription>Uma análise profunda do seu ser e do momento presente.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          
          <Section 
            value="item-1"
            icon={<Dna className="mr-2 h-5 w-5 text-primary" />}
            title="Resumo Filosófico"
            content={interpretation.philosophicalSummary}
          />
          
          <Section 
            value="item-2"
            icon={<Sparkles className="mr-2 h-5 w-5 text-primary" />}
            title="Alma e Personalidade (Luz & Sombra)"
            content={interpretation.soulAndPersonality}
          />

          <Section 
            value="item-3"
            icon={<GitCommit className="mr-2 h-5 w-5 text-primary" />}
            title="Eixo do Destino (Nodos Lunares)"
            content={interpretation.destinyAxis}
          />

          <Section 
            value="item-4"
            icon={<Telescope className="mr-2 h-5 w-5 text-primary" />}
            title="Ciclos Externos (Trânsitos Atuais)"
            content={interpretation.externalCycles}
          />

          <Section 
            value="item-5"
            icon={<Moon className="mr-2 h-5 w-5 text-primary" />}
            title="Calendário Lunar"
            content={interpretation.lunarCalendar}
          />

          <Section 
            value="item-6"
            icon={<Wand2 className="mr-2 h-5 w-5 text-primary" />}
            title="Tarot do Dia"
            content={interpretation.tarotOfTheDay}
          />

           <Card className="mt-6 bg-muted/30 border-primary/30">
             <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center">
                    <Star className="mr-2 h-5 w-5 text-primary" />
                    Reflexão Arquetípica do Dia
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-base text-center font-headline italic text-foreground/90">
                    "{interpretation.archetypalReflection}"
                </p>
             </CardContent>
           </Card>

        </Accordion>
      </CardContent>
    </Card>
  );
}
