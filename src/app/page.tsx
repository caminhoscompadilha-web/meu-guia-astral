import React from 'react';

export default function PaginaTemporaria() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#D4AF37', minHeight: '100vh', padding: '50px', textAlign: 'center', fontFamily: 'serif' }}>
      <h1 style={{ letterSpacing: '0.5em', fontSize: '12px' }}>PORTAL MEU GUIA ASTRAL</h1>
      <h2 style={{ color: 'white', fontSize: '40px', marginTop: '20px' }}>O Dossiê do Ciclo</h2>
      <p style={{ color: '#888', fontStyle: 'italic', maxWidth: '600px', margin: '20px auto' }}>
        "Sob a regência de Marte e o olhar do Ocultismo, sua jornada de autoconhecimento começa aqui."
      </p>
      <div style={{ border: '1px solid #333', padding: '30px', margin: '40px auto', maxWidth: '500px' }}>
        <p style={{ color: '#ccc' }}>O motor astrológico está sendo calibrado...</p>
        <button style={{ backgroundColor: '#D4AF37', color: 'black', padding: '15px 30px', border: 'none', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>
          DESBLOQUEAR MEU CICLO (R$ 47,90)
        </button>
      </div>
    </div>
  );
}
