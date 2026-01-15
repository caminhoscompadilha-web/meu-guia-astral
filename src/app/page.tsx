import React from 'react';

export default function PortalAstral() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#D4AF37', minHeight: '100vh', padding: '40px', fontFamily: 'serif' }}>
      {/* CABEÇALHO DE LUXO */}
      <header style={{ textAlign: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '30px', marginBottom: '40px' }}>
        <h1 style={{ letterSpacing: '0.6em', fontSize: '12px', margin: '0' }}>PORTAL MEU GUIA ASTRAL</h1>
        <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 'lighter', marginTop: '15px' }}>Dossiê de Autoconhecimento</h2>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* SEÇÃO DE MITOLOGIA E OCULTISMO */}
        <section style={{ backgroundColor: '#0a0a0a', border: '1px solid #332b1a', padding: '30px', borderRadius: '4px', marginBottom: '30px' }}>
          <h3 style={{ color: '#D4AF37', fontSize: '18px', marginBottom: '20px', borderLeft: '3px solid #D4AF37', paddingLeft: '15px' }}>
            A Força de Marte e o Anjo Samael
          </h3>
          <p style={{ color: '#ccc', lineHeight: '1.8', textAlign: 'justify', fontSize: '15px' }}>
            Neste ciclo, sua energia é regida pelo metal <strong>Ferro</strong>. No estudo do ocultismo, Marte não é apenas conflito, é a "Vontade Necessária". O Anjo Samael observa sua capacidade de transformar raiva em disciplina. 
            <br /><br />
            <strong>Reflexão:</strong> Onde você está gastando sua força vital de forma desordenada? Sua cor de poder para este mês é o <strong>Vermelho Carmesim</strong>, use-a para ancorar sua presença.
          </p>
        </section>

        {/* BOTÃO DE PAGAMENTO */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '15px' }}>Acesso completo ao ciclo de 30 dias</p>
          <button style={{ backgroundColor: '#D4AF37', color: 'black', padding: '18px 40px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '2px', fontSize: '14px', transition: '0.3s' }}>
            DESBLOQUEAR MINHAS SOLUÇÕES (R$ 47,90)
          </button>
        </div>
      </main>
    </div>
  );
}
