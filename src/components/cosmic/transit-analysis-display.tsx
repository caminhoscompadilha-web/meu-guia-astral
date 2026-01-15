
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Telescope, Wand2, Star } from 'lucide-react';
import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";
import type { Translations } from "@/lib/i18n";

interface TransitAnalysisDisplayProps {
  transits: InterpretNatalChartOutput; 
  translations: Translations;
}

export function TransitAnalysisDisplay({ transits, translations }: TransitAnalysisDisplayProps) {
  if (!transits) {
    return <p>{translations.ui.waitingForAnalysis}</p>;
  }

  const t = translations.analysis;

  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Telescope className="mr-3 h-6 w-6" />
            {t.externalCycles}
          </CardTitle>
          <CardDescription>{t.externalCyclesDescription}</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.externalCycles}
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
             <Moon className="mr-3 h-6 w-6" />
             {t.lunarCalendar}
          </CardTitle>
          <CardDescription>{t.lunarCalendarDescription}</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.lunarCalendar}
        </CardContent>
      </Card>
      
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Wand2 className="mr-3 h-6 w-6" />
            {t.tarotOfTheDay}
          </CardTitle>
          <CardDescription>{t.tarotOfTheDayDescription}</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.tarotOfTheDay}
        </CardContent>
      </Card>

      <Card className="mt-6 bg-muted/30 border-primary/30">
        <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center">
            <Star className="mr-2 h-5 w-5 text-primary" />
            {t.archetypalReflection}
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
