
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meu Guia Astrológico',
  description: 'Desvende os segredos do seu mapa celestial.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" translate="no">
      <body>
          {children}
      </body>
    </html>
  );
}
