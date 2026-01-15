import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Telescope, Wand2 } from 'lucide-react';
import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";

interface TransitAnalysisDisplayProps {
  // The transits prop is now the full interpretation object
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
    </div>
  );
}
