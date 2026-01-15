import type { Planet } from '@/lib/types';
import { Sun, Moon, Sunrise, CircleDot } from 'lucide-react';

const icons: Record<Planet, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Sun: (props) => <Sun {...props} />,
  Moon: (props) => <Moon {...props} />,
  Mercury: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <line x1="12" y1="12" x2="12" y2="20" />
      <line x1="8" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Venus: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5" />
      <line x1="12" y1="14" x2="12" y2="21" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  Mars: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="14" r="6" />
      <line x1="14" y1="10" x2="20" y2="4" />
      <line x1="14" y1="4" x2="20" y2="4" />
      <line x1="20" y1="4" x2="20" y2="10" />
    </svg>
  ),
  Jupiter: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" />
      <path d="M9 4v16" />
      <path d="M9 4a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4" />
    </svg>
  ),
  Saturn: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12h8" />
      <path d="M12 4v16" />
      <path d="M16 4a4 4 0 0 0-8 0" />
    </svg>
  ),
  Uranus: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0" />
      <path d="M12 7V2" />
      <path d="M12 22v-5" />
      <path d="M7 12H2" />
      <path d="M22 12h-5" />
    </svg>
  ),
  Neptune: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0" />
      <path d="M12 7V2l-3 3" />
      <path d="M12 2v5l3 3" />
      <path d="M7 12H2" />
      <path d="M22 12h-5" />
    </svg>
  ),
  Pluto: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" />
      <path d="M12 8V2" />
      <path d="M10 4h4" />
    </svg>
  ),
  Ascendant: (props) => <Sunrise {...props} />,
};

interface PlanetIconProps extends React.SVGProps<SVGSVGElement> {
  planet: Planet;
}

export const PlanetIcon: React.FC<PlanetIconProps> = ({ planet, ...props }) => {
  const Icon = icons[planet] || CircleDot; // Fallback icon
  return <Icon {...props} />;
};
