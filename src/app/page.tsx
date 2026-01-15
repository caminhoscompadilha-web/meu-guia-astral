import React from 'react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#D4AF37', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' }}>
      <h1 style={{ letterSpacing: '0.8em', fontSize: '14px' }}>PORTAL MEU GUIA ASTRAL</h1>
      <div style={{ width: '40px', height: '1px', backgroundColor: '#D4AF37', margin: '20px' }}></div>
      <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 'lighter' }}>Dossiê de Autoconhecimento</h2>
      <button style={{ marginTop: '40px', backgroundColor: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '15px 40px', cursor: 'pointer', fontSize: '12px' }}>
        DESBLOQUEAR CICLO 30 DIAS
      </button>
    </div>
  );
}
