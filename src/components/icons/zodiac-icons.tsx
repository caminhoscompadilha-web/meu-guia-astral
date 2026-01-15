
import { CircleDot } from 'lucide-react';

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Aries: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0" />
      <path d="M6 9V2" />
      <path d="M18 9V2" />
      <path d="M12 21V9" />
    </svg>
  ),
  Taurus: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" />
      <path d="M12 12c-6 0-10 6-10 10" />
      <path d="M12 12c6 0 10 6 10 10" />
    </svg>
  ),
  Gemini: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v18" />
      <path d="M18 3v18" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
    </svg>
  ),
  Cancer: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12a4 4 0 1 0-8 0" />
      <path d="M18 12a4 4 0 1 0 8 0" />
      <path d="M2 12h2.5" />
      <path d="M22 12h-2.5" />
      <path d="M4.5 12a10 10 0 0 0 15 0" />
    </svg>
  ),
  Leo: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" />
      <path d="M8 12c0-4 4-8 8-8" />
      <path d="M16 12c0 4-4 8-8 8" />
    </svg>
  ),
  Virgo: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3v18" />
      <path d="M8 3v18" />
      <path d="M12 3v18" />
      <path d="M16 3a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4" />
      <path d="M20 3a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h0" />
    </svg>
  ),
  Libra: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18" />
      <path d="M3 6h18" />
      <path d="M7 12c0 4 2 8 5 8s5-4 5-8" />
    </svg>
  ),
  Scorpio: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3v18" />
      <path d="M8 3v18" />
      <path d="M12 3v18" />
      <path d="M16 3a4 4 0 0 1 4 4v10"/>
      <path d="M20 17l-4 4-4-4"/>
    </svg>
  ),
  Sagittarius: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L20 4" />
      <path d="M13 4h7v7" />
      <path d="M6 12H4v-2" />
    </svg>
  ),
  Capricorn: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v12" />
      <path d="M4 8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4" />
      <path d="M16 12a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4"/>
    </svg>
  ),
  Aquarius: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l3-3 3 3 3-3 3 3 3-3 3 3" />
      <path d="M3 18l3-3 3 3 3-3 3 3 3-3 3 3" />
    </svg>
  ),
  Pisces: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8a4 4 0 0 1 4-4h12" />
      <path d="M20 16a4 4 0 0 1-4 4H4" />
      <path d="M12 4v16" />
    </svg>
  ),
};

interface ZodiacIconProps extends React.SVGProps<SVGSVGElement> {
  sign: string;
}

export const ZodiacIcon: React.FC<ZodiacIconProps> = ({ sign, ...props }) => {
  const Icon = icons[sign] || CircleDot; // Fallback icon
  return <Icon {...props} />;
};
