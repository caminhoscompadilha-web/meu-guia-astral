
'use client';

export function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Círculo Externo (O Universo) */}
      <circle cx="50" cy="50" r="45" stroke="url(#paint0_linear)" strokeWidth="2"/>
      {/* Sol Central */}
      <circle cx="50" cy="50" r="12" fill="url(#paint1_linear)"/>
      {/* Raios da Bússola/Estrela */}
      <path d="M50 5V25M50 75V95M5 50H25M75 50H95M18 18L32 32M68 68L82 82M18 82L32 68M68 32L82 18" 
            stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7"/> {/* Roxo */}
          <stop offset="1" stopColor="#3B82F6"/> {/* Azul */}
        </linearGradient>
        <linearGradient id="paint1_linear" x1="38" y1="38" x2="62" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FACC15"/> {/* Amarelo Sol */}
          <stop offset="1" stopColor="#F97316"/> {/* Laranja */}
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-headline text-lg font-bold">Meu Guia Astrológico</span>
        </div>
      </div>
    </header>
  );
}
