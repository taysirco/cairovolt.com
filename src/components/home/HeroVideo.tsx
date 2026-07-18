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
 * Background hero video, tuned for speed. The poster (a priority next/image
 * underneath) is the LCP and paints instantly; the video is NOT auto-preloaded
 * (`preload="none"`, no `autoPlay` attribute) so it never competes with first
 * paint. Once the browser is idle we mute + play() it, which is when the actual
 * download happens. Reduced-motion / no-JS visitors simply keep the poster.
 */
export default function HeroVideo({ className, style, poster, webm, mp4 }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      v.muted = true; // required for programmatic autoplay
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    // Defer the video download + playback until the browser is idle so it never
    // blocks the LCP poster / critical render.
    let idleId: number;
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) {
      idleId = ric(start, { timeout: 2500 });
    } else {
      idleId = window.setTimeout(start, 1200);
    }

    return () => {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cic) cic(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
