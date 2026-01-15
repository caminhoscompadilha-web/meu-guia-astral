import type { InterpretNatalChartOutput } from "@/ai/flows/interpret-natal-chart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InterpretationDisplayProps {
  interpretation: InterpretNatalChartOutput;
}

export function InterpretationDisplay({ interpretation }: InterpretationDisplayProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Cosmic DNA</CardTitle>
        <CardDescription>An AI-powered interpretation of your unique natal chart.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-headline text-lg">Personality Traits</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {interpretation.personalityTraits}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-headline text-lg">Life Path & Opportunities</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {interpretation.lifePathAspects}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-headline text-lg">Strengths & Potential</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {interpretation.potential}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
