"use client";

import type { NatalChartData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanetIcon } from '@/components/icons/planet-icons';
import { ZodiacIcon } from '@/components/icons/zodiac-icons';
import { ZODIAC_SIGNS } from '@/lib/constants';

interface NatalChartDisplayProps {
  chartData: NatalChartData;
}

export function NatalChartDisplay({ chartData }: NatalChartDisplayProps) {
  const size = 300;
  const center = size / 2;
  const houseRadius = size / 2 - 10;
  const zodiacRadius = size / 2 - 25;
  const planetRadius = size / 2 - 50;

  const getCoordinates = (radius: number, index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2 - Math.PI / total;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {chartData.name ? `${chartData.name}'s Chart` : "Your Natal Chart"}
        </CardTitle>
        <CardDescription>A snapshot of the cosmos at your birth.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0 pb-6">
        <div className="relative w-full aspect-square max-w-[300px]">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Background circles */}
            <circle cx={center} cy={center} r={houseRadius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" />
            <circle cx={center} cy={center} r={zodiacRadius} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <circle cx={center} cy={center} r={planetRadius} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" />
            
            {/* House lines */}
            {Array.from({ length: 12 }).map((_, i) => {
              const { x, y } = getCoordinates(houseRadius, i, 12);
              const endX = center + (center - x)
              const endY = center + (center - y)
              return <line key={i} x1={x} y1={y} x2={endX} y2={endY} stroke="hsl(var(--border))" strokeWidth="0.5" />;
            })}
            
            {/* Zodiac Signs */}
            {ZODIAC_SIGNS.map((sign, i) => {
              const { x, y } = getCoordinates(zodiacRadius, i, 12);
              return (
                <g key={sign} transform={`translate(${x}, ${y})`}>
                  <ZodiacIcon sign={sign} className="w-5 h-5 text-accent fill-accent" style={{ transform: 'translate(-10px, -10px)', animation: `fade-in 1s ease-out ${i * 0.1}s both` }} />
                </g>
              );
            })}

            {/* Planets */}
            {chartData.positions.map((pos, i) => {
              const signIndex = ZODIAC_SIGNS.indexOf(pos.sign);
              const houseOffset = (pos.house - 1) / 12;
              const totalIndex = signIndex + houseOffset;
              const { x, y } = getCoordinates(planetRadius * (0.6 + (i % 5) * 0.08), totalIndex, 12);
              return (
                <g key={pos.planet} className="animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: `${200 + i * 50}ms`, animationFillMode: 'both' }}>
                  <PlanetIcon planet={pos.planet} x={x-8} y={y-8} className="w-4 h-4 text-primary" filter="url(#glow)" />
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
