import type { AnalyzePlanetaryTransitsOutput } from "@/ai/flows/analyze-planetary-transits";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TransitAnalysisDisplayProps {
  transits: AnalyzePlanetaryTransitsOutput;
}

export function TransitAnalysisDisplay({ transits }: TransitAnalysisDisplayProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Clima Cósmico Atual</CardTitle>
          <CardDescription>Um resumo de como os movimentos planetários atuais afetam você, via IA.</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed">
          {transits.summary}
        </CardContent>
      </Card>
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Análise Detalhada dos Trânsitos</CardTitle>
          <CardDescription>Um olhar aprofundado sobre os trânsitos significativos em andamento.</CardDescription>
        </CardHeader>
        <CardContent className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {transits.detailedAnalysis}
        </CardContent>
      </Card>
    </div>
  );
}
