
import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";
import type { Translations } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, Sparkles, GitCommit, Map } from "lucide-react";

interface InterpretationDisplayProps {
  interpretation: InterpretNatalChartOutput;
  translations: Translations;
}

const Section = ({ icon, title, content, value }: { icon: React.ReactNode, title: string, content: string, value: string }) => (
    <AccordionItem value={value}>
        <AccordionTrigger className="font-headline text-lg text-left">
            <div className="flex items-center">
              {icon}
              {title}
            </div>
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {content}
        </AccordionContent>
    </AccordionItem>
);


export function InterpretationDisplay({ interpretation, translations }: InterpretationDisplayProps) {
  if (!interpretation) {
    return (
       <Card className="bg-card/80 backdrop-blur-sm border-destructive/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-destructive">{translations.errors.interpretationErrorTitle}</CardTitle>
          <CardDescription>{translations.errors.interpretationErrorDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{translations.ui.waitingForData}</p>
        </CardContent>
      </Card>
    )
  }

  const t = translations.analysis;

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.personalAnalysisTitle}</CardTitle>
        <CardDescription>{t.personalAnalysisDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          
          <Section 
            value="item-1"
            icon={<Dna className="mr-2 h-5 w-5 text-primary" />}
            title={t.philosophicalSummary}
            content={interpretation.philosophicalSummary}
          />
          
          <Section 
            value="item-2"
            icon={<Sparkles className="mr-2 h-5 w-5 text-primary" />}
            title={t.soulAndPersonality}
            content={interpretation.soulAndPersonality}
          />

          <Section 
            value="item-3"
            icon={<GitCommit className="mr-2 h-5 w-5 text-primary" />}
            title={t.destinyAxis}
            content={interpretation.destinyAxis}
          />

           <Section 
            value="item-4"
            icon={<Map className="mr-2 h-5 w-5 text-primary" />}
            title={t.astrocartography}
            content={interpretation.astrocartographyAnalysis}
          />

        </Accordion>
      </CardContent>
    </Card>
  );
}
