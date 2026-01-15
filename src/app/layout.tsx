
import type {Metadata} from 'next';
import { Literata, Space_Grotesk } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meu Guia Astrológico',
  description: 'Desvende os segredos do seu mapa celestial.',
};

const literata = Literata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-literata',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${literata.variable} ${spaceGrotesk.variable} dark`} translate="no">
      <body className="font-body antialiased">
          {children}
      </body>
    </html>
  );
}
