"use client";

import { useEffect, useRef } from "react";

export default function PreviewWatermark() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 80, y: 120 });
  const vel = useRef({ x: 1.2, y: 0.9 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const elW = rect.width || 60;
    const elH = rect.height || 36;

    function step() {
      const W = window.innerWidth - elW;
      const H = window.innerHeight - elH;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      if (pos.current.x <= 0 || pos.current.x >= W) {
        vel.current.x *= -1;
        pos.current.x = Math.max(0, Math.min(pos.current.x, W));
      }
      if (pos.current.y <= 0 || pos.current.y >= H) {
        vel.current.y *= -1;
        pos.current.y = Math.max(0, Math.min(pos.current.y, H));
      }

      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(step);
    }

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      ref={ref}
      // inert torna o elemento completamente inativo no iOS Safari
      // (pointer-events:none sozinho não bloqueia touch no Safari)
      inert=""
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] select-none"
      style={{ opacity: 0.18 }}
    >
      <div className="flex flex-col items-center leading-none px-1 py-0.5">
        <span className="text-white font-bold text-lg tracking-tight">
          Innove<span className="text-brand-blue">.</span>
        </span>
        <span className="text-white/80 font-medium text-[10px] tracking-[0.2em] uppercase">
          preview
        </span>
      </div>
    </div>
  );
}
