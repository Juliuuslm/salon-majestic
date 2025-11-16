import React from 'react';
import {
  Calendar,
  Mic,
  Handshake,
  TrendingUp,
  Video,
  Palette,
  Target,
  Users,
  Star,
  Trophy,
  Image,
  BarChart3,
} from 'lucide-react';

interface Props {
  icon: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar />,
  microphone: <Mic />,
  handshake: <Handshake />,
  'trending-up': <TrendingUp />,
  video: <Video />,
  palette: <Palette />,
  target: <Target />,
  users: <Users />,
  star: <Star />,
  trophy: <Trophy />,
  image: <Image />,
  'bar-chart': <BarChart3 />,
};

export default function IconRenderer({ icon, size = 24, className = '' }: Props) {
  const Icon = iconMap[icon.toLowerCase()];

  if (!Icon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  return <div style={{ width: size, height: size }} className={className}>{Icon}</div>;
}
