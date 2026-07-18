'use client';

import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  className?: string;
  style?: React.CSSProperties;
  poster: string;
  webm: string;
  mp4: string;
}

/**
 * Background hero video. The muted/autoplay/playsInline/loop attributes already
 * autoplay on every mainstream browser via the SSR HTML; this thin client
 * wrapper is belt-and-suspenders — it re-asserts muted and nudges play() once
 * mounted so data-saver modes and stricter autoplay policies still start the
 * loop instead of freezing on the poster. Failures are swallowed (the poster
 * simply stays visible).
 */
export default function HeroVideo({ className, style, poster, webm, mp4 }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // required for programmatic autoplay
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
