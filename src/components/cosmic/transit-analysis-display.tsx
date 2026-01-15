
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Telescope, Wand2, Star } from 'lucide-react';
import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";

interface TransitAnalysisDisplayProps {
  transits: InterpretNatalChartOutput; 
}

export function TransitAnalysisDisplay({ transits }: TransitAnalysisDisplayProps) {
  if (!transits) {
    return <p>Aguardando análise dos trânsitos...</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Telescope className="mr-3 h-6 w-6" />
            Ciclos Externos
          </CardTitle>
          <CardDescription>Como os grandes planetas movimentam sua energia hoje.</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.externalCycles}
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
             <Moon className="mr-3 h-6 w-6" />
            Calendário Lunar
          </CardTitle>
          <CardDescription>A influência da fase lunar atual no seu mapa.</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.lunarCalendar}
        </CardContent>
      </Card>
      
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Wand2 className="mr-3 h-6 w-6" />
            Tarot do Dia
          </CardTitle>
          <CardDescription>O arquétipo que guia seu dia, em sintonia com os astros.</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.tarotOfTheDay}
        </CardContent>
      </Card>

      <Card className="mt-6 bg-muted/30 border-primary/30">
        <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center">
            <Star className="mr-2 h-5 w-5 text-primary" />
            Reflexão Arquetípica do Dia
        </CardTitle>
        </CardHeader>
        <CardContent>
        <p className="text-base text-center font-headline italic text-foreground/90">
            "{transits.archetypalReflection}"
        </p>
        </CardContent>
      </Card>
    </div>
  );
}
