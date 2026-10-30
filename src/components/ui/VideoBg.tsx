import { useEffect, useRef, useState } from 'react';
import { VIDEO_SRC } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { releasePlay, requestPlay } from '@/lib/videoRegistry';

export default function VideoBg({
  offset = 0.5,
  mirrored = false,
  className = '',
}: {
  offset?: number;
  mirrored?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, progress } = useScrollProgress<HTMLDivElement>('enter');
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seek = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        try {
          video.currentTime = video.duration * offset;
        } catch {
          /* seeking can fail before data is buffered */
        }
      }
      setReady(true);
    };

    if (video.readyState >= 1) seek();
    else video.addEventListener('loadedmetadata', seek);
    return () => video.removeEventListener('loadedmetadata', seek);
  }, [offset]);

  useEffect(() => {
    const video = videoRef.current;
    const host = ref.current;
    if (!video || !host) return;

    let visible = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden && !reduced) requestPlay(video);
        else releasePlay(video);
      },
      { threshold: 0.01 },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) releasePlay(video);
      else if (visible && !reduced) requestPlay(video);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      releasePlay(video);
    };
  }, [reduced, ref]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reduced) return;
    releasePlay(video);
    if (ready) {
      try {
        video.currentTime = (video.duration || 0) * offset;
      } catch {
        /* noop */
      }
    }
  }, [reduced, offset, ready]);

  const p = reduced ? 0.5 : progress;
  const translate = -6 + p * 12;
  const scale = reduced ? 1 : 1.08 - p * 0.08;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden rounded-[inherit] bg-[#0B0F26] ${className}`}
    >
      <div
        className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform"
        style={{ transform: `translateY(${translate.toFixed(2)}%) scale(${scale.toFixed(3)})` }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          preload="none"
          muted
          loop
          playsInline
          tabIndex={-1}
          className={`h-full w-full object-cover ${mirrored ? 'scale-x-[-1]' : ''}`}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,24,0.35),rgba(7,9,24,0.85))]" />
    </div>
  );
}
