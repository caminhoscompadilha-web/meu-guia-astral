'use client';
import React from 'react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#D4AF37', minHeight: '100vh', padding: '40px', fontFamily: 'serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ letterSpacing: '0.6em', fontSize: '14px', margin: '0', color: '#D4AF37' }}>PORTAL MEU GUIA ASTRAL</h1>
        <div style={{ width: '50px', height: '1px', backgroundColor: '#D4AF37', margin: '20px auto' }}></div>
        <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 'lighter' }}>Dossiê de Autoconhecimento</h2>
      </header>
      <main style={{ maxWidth: '600px', backgroundColor: '#0a0a0a', border: '1px solid #332b1a', padding: '40px', borderRadius: '4px', textAlign: 'center' }}>
        <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '16px', marginBottom: '30px' }}>
          'O universo não fala por coincidências, mas por sinais. Sob a regência de Marte, sua vontade é forjada no ferro e no silêncio.'
        </p>
        <button style={{ backgroundColor: '#D4AF37', color: 'black', padding: '15px 40px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', borderRadius: '4px' }}>
          DESBLOQUEAR MEU CICLO (R$ 47,90)
        </button>
      </main>
    </div>
  );
}