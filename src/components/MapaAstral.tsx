
'use client';
import React from 'react';
import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";

// URL para o desenho dos países (GeoJSON gratuito)
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/master/world.json";

export default function MapaAstral({ linhas }: { linhas: any[] }) {
  return (
    <div className="bg-slate-950 rounded-3xl p-4 border border-slate-800 shadow-2xl">
      <div className="mb-4 flex justify-between items-center px-4">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Mapa de Influências Mundiais
        </h4>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1 text-emerald-400">● Luz (Vênus/Júpiter)</span>
          <span className="flex items-center gap-1 text-red-500">● Sombra (Saturno/Marte)</span>
        </div>
      </div>

      <ComposableMap projectionConfig={{ scale: 145 }} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e293b" // Cor dos países (Slate 800)
                stroke="#334155" // Fronteiras
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {/* Exemplo de Linha de Sombra (Vertical - Longitude de Saturno) */}
        <Line
          from={[-46.6, 90]} // Longitude simulada
          to={[-46.6, -90]}
          stroke="#ef4444" // Vermelho para Sombra
          strokeWidth={3}
          strokeDasharray="5, 5"
        />

        {/* Exemplo de Linha de Luz (Vertical - Longitude de Júpiter) */}
        <Line
          from={[12.5, 90]} // Longitude simulada
          to={[12.5, -90]}
          stroke="#10b981" // Verde para Luz
          strokeWidth={3}
        />
      </ComposableMap>
      
      <p className="text-[10px] text-slate-500 mt-4 text-center italic">
        As linhas indicam onde a energia planetária atinge o zênite no momento do seu nascimento.
      </p>
    </div>
  );
}
