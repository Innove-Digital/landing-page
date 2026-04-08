"use client";

import { useEffect, useRef } from "react";

const rings = [
  {
    r: 190,
    speed: 20,
    rev: false,
    nodes: [
      {
        angle: 320,
        icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
      },
      {
        angle: 150,
        icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
      },
    ],
  },
  {
    r: 130,
    speed: 14,
    rev: true,
    nodes: [
      {
        angle: 50,
        icon: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>',
      },
      {
        angle: 230,
        icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
      },
    ],
  },
  {
    r: 70,
    speed: 9,
    rev: false,
    nodes: [
      {
        angle: 90,
        icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>',
      },
    ],
  },
];

export default function OrbitWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerW = container.offsetWidth || 420;
    const cx = containerW * 0.38;
    const cy = 210;

    rings.forEach((ring) => {
      const d = ring.r * 2;
      const dir = ring.rev ? "reverse" : "normal";

      const ringEl = document.createElement("div");
      ringEl.style.cssText = [
        "position:absolute",
        "border-radius:50%",
        "border:1px solid rgba(0,180,255,0.18)",
        `width:${d}px`,
        `height:${d}px`,
        `left:${cx - ring.r}px`,
        `top:${cy - ring.r}px`,
        `animation:innove-spin ${ring.speed}s linear ${dir} infinite`,
        `transform-origin:${ring.r}px ${ring.r}px`,
      ].join(";");

      ring.nodes.forEach((n) => {
        const rad = ((n.angle - 90) * Math.PI) / 180;
        const nx = ring.r + Math.cos(rad) * ring.r;
        const ny = ring.r + Math.sin(rad) * ring.r;
        const counterDir = ring.rev ? "reverse" : "normal";
        const nodeEl = document.createElement("div");
        nodeEl.style.cssText = [
          "position:absolute",
          "width:40px",
          "height:40px",
          "border-radius:50%",
          "background:rgba(8,15,48,0.9)",
          "border:1px solid rgba(0,180,255,0.5)",
          "display:flex",
          "align-items:center",
          "justify-content:center",
          `left:${nx - 20}px`,
          `top:${ny - 20}px`,
          `animation:innove-counter ${ring.speed}s linear ${counterDir} infinite`,
        ].join(";");
        nodeEl.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" style="stroke:#00b4ff;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round">${n.icon}</svg>`;
        ringEl.appendChild(nodeEl);
      });

      container.appendChild(ringEl);
    });

    const dot = document.createElement("div");
    dot.style.cssText = [
      "position:absolute",
      "width:18px",
      "height:18px",
      "border-radius:50%",
      "background:rgba(0,180,255,0.12)",
      "border:1px solid rgba(0,180,255,0.4)",
      `left:${cx - 9}px`,
      `top:${cy - 9}px`,
    ].join(";");
    container.appendChild(dot);

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", height: "420px" }}
    />
  );
}
