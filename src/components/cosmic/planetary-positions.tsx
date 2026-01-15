import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlanetPosition } from "@/lib/types";
import { PlanetIcon } from '@/components/icons/planet-icons';
import { ZodiacIcon } from '@/components/icons/zodiac-icons';

interface PlanetaryPositionsProps {
  positions: PlanetPosition[];
}

export function PlanetaryPositions({ positions }: PlanetaryPositionsProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Posições Planetárias</CardTitle>
        <CardDescription>Os corpos celestes e seus posicionamentos.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Planeta</TableHead>
              <TableHead>Signo</TableHead>
              <TableHead className="text-right">Casa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((pos) => (
              <TableRow key={pos.planet} className="animate-in fade-in-5 slide-in-from-bottom-2 duration-300">
                <TableCell className="font-medium flex items-center gap-2">
                  <PlanetIcon planet={pos.planet} className="w-4 h-4 text-primary" />
                  {pos.planet}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <ZodiacIcon sign={pos.sign} className="w-4 h-4 text-accent" />
                  {pos.sign}
                </TableCell>
                <TableCell className="text-right">{pos.house}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
