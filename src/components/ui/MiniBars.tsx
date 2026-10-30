import { BAR_HEIGHTS } from '@/components/Hero';
import { useInView } from '@/hooks/useInView';

export default function MiniBars({
  heights = BAR_HEIGHTS,
  projectedFrom,
  heightClass = 'h-[72px]',
  gap = 'gap-[1.5px]',
  baseDelay = 0,
  runKey = 0,
}: {
  heights?: number[];
  projectedFrom?: number;
  heightClass?: string;
  gap?: string;
  baseDelay?: number;
  runKey?: number | string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const max = Math.max(...heights);
  const cutoff = projectedFrom ?? heights.length - 4;

  return (
    <div ref={ref} className={`flex items-end ${gap} ${heightClass}`}>
      {heights.map((h, i) => {
        const projected = i >= cutoff;
        return (
          <div
            key={`${runKey}-${i}`}
            className={`flex-1 origin-bottom rounded-[0.5px] ${inView ? 'animate-bar-grow' : 'opacity-0'}`}
            style={{
              height: `${(h / max) * 100}%`,
              background: projected
                ? 'rgba(108,140,255,0.28)'
                : 'linear-gradient(to top, rgba(108,140,255,0.6), #FFFFFF)',
              animationDelay: `${baseDelay + i * 30}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
