import { useInView } from '@/hooks/useInView';

export type DoodleName =
  | 'star'
  | 'squiggle'
  | 'constellation'
  | 'comet'
  | 'compass'
  | 'orbit'
  | 'arrow-curl'
  | 'crosshair'
  | 'loop-arrow';

type Art = { viewBox: string; paths: string[]; dots?: Array<[number, number]> };

const ART: Record<DoodleName, Art> = {
  star: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2 C12.8 8 16 11.2 22 12 C16 12.8 12.8 16 12 22 C11.2 16 8 12.8 2 12 C8 11.2 11.2 8 12 2 Z',
    ],
  },
  squiggle: {
    viewBox: '0 0 120 14',
    paths: ['M2 8 Q12 1 22 8 T42 8 T62 8 T82 8 T102 8 T118 8'],
  },
  constellation: {
    viewBox: '0 0 80 40',
    paths: ['M4 30 L22 14 L40 24 L58 8 L76 20'],
    dots: [
      [4, 30],
      [22, 14],
      [40, 24],
      [58, 8],
      [76, 20],
    ],
  },
  comet: {
    viewBox: '0 0 24 24',
    paths: ['M3 21 C9 17 14 12 20 5'],
    dots: [[20, 5]],
  },
  compass: {
    viewBox: '0 0 32 32',
    paths: [
      'M16 3 A13 13 0 1 1 15.99 3',
      'M16 7.5 L20 16 L16 24.5 L12 16 Z',
      'M16 1 L16 3.5',
      'M16 28.5 L16 31',
      'M1 16 L3.5 16',
      'M28.5 16 L31 16',
    ],
  },
  orbit: {
    viewBox: '0 0 40 40',
    paths: [
      'M20 6 A14 14 0 1 1 19.99 6',
      'M4 20 C4 14 11 10 20 10 C29 10 36 14 36 20 C36 26 29 30 20 30 C11 30 4 26 4 20',
    ],
    dots: [
      [20, 20],
      [36, 20],
    ],
  },
  'arrow-curl': {
    viewBox: '0 0 40 32',
    paths: ['M4 27 C4 13 16 6 31 8', 'M31 8 L24 3', 'M31 8 L24 16'],
  },
  crosshair: {
    viewBox: '0 0 32 32',
    paths: [
      'M16 7.5 A8.5 8.5 0 1 1 15.99 7.5',
      'M16 1 L16 5',
      'M16 27 L16 31',
      'M1 16 L5 16',
      'M27 16 L31 16',
    ],
  },
  'loop-arrow': {
    viewBox: '0 0 32 32',
    paths: ['M27 16 A11 11 0 1 1 16 5', 'M16 5 L22 5', 'M16 5 L16 11'],
  },
};

export default function Doodle({
  name,
  className = '',
  draw = true,
  float = true,
}: {
  name: DoodleName;
  className?: string;
  draw?: boolean;
  float?: boolean;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const art = ART[name];
  const pathClass = draw ? 'doodle-fade' : undefined;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`inline-block ${draw && inView ? 'doodle-in' : ''} ${className}`}
    >
      <span className={`block h-full w-full ${float ? 'doodle-float' : ''}`}>
        <svg
          viewBox={art.viewBox}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
        >
        {art.paths.map((d, i) => (
          <path
            key={i}
            d={d}
            vectorEffect="non-scaling-stroke"
            className={pathClass}
            style={draw ? { transitionDelay: `${i * 70}ms` } : undefined}
          />
        ))}
        {art.dots?.map(([cx, cy], i) => (
          <circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r={1.25}
            fill="currentColor"
            stroke="none"
            vectorEffect="non-scaling-stroke"
            className={pathClass}
            style={draw ? { transitionDelay: `${(art.paths.length + i) * 70}ms` } : undefined}
          />
        ))}
        </svg>
      </span>
    </span>
  );
}
