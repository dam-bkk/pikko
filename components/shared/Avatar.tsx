import Image from 'next/image';

export type AvatarId =
  | 'tiger-cub' | 'elephant-calf' | 'cat' | 'owl'
  | 'boy-1' | 'boy-2' | 'girl-1' | 'girl-2'
  | 'robot' | 'astronaut' | 'wizard' | 'dragon';

export const AVATAR_LIST: { id: AvatarId; label: string; group: 'animals' | 'kids' | 'fantasy' }[] = [
  { id: 'tiger-cub',     label: 'Tiger Cub',   group: 'animals'  },
  { id: 'elephant-calf', label: 'Elephant',     group: 'animals'  },
  { id: 'cat',           label: 'Cat',          group: 'animals'  },
  { id: 'owl',           label: 'Owl',          group: 'animals'  },
  { id: 'boy-1',         label: 'Ploy',         group: 'kids'     },
  { id: 'boy-2',         label: 'Beam',         group: 'kids'     },
  { id: 'girl-1',        label: 'Nam',          group: 'kids'     },
  { id: 'girl-2',        label: 'Ploy-Mai',     group: 'kids'     },
  { id: 'robot',         label: 'Booky-Bot',    group: 'fantasy'  },
  { id: 'astronaut',     label: 'Space Kid',    group: 'fantasy'  },
  { id: 'wizard',        label: 'Mali-Mage',    group: 'fantasy'  },
  { id: 'dragon',        label: 'Naga',         group: 'fantasy'  },
];

export const GROUP_LABELS: Record<string, string> = {
  animals: '🐾 Animals',
  kids:    '👦 Kids',
  fantasy: '✨ Fantasy',
};

interface AvatarProps {
  id: AvatarId | string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Avatar({ id, size = 64, className = '', style }: AvatarProps) {
  return (
    <Image
      src={`/avatars/${id}.svg`}
      alt={id}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      style={{ borderRadius: '50%', objectFit: 'cover', ...style }}
    />
  );
}
