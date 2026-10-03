"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Node {
  x: number;
  y: number;
  r: number;
  delay: number;
}

function seededNodes(count: number): Node[] {
  // Deterministic pseudo-random layout so SSR/CSR match (no Math.random hydration mismatch).
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 * 2.4;
    const radius = 90 + ((i * 37) % 260);
    nodes.push({
      x: 400 + Math.cos(angle) * radius,
      y: 260 + Math.sin(angle) * radius * 0.62,
      r: 2.5 + (i % 4),
      delay: (i % 7) * 0.35,
    });
  }
  return nodes;
}

export function MoleculeNetwork() {
  const reduceMotion = useReducedMotion();
  const nodes = useMemo(() => seededNodes(26), []);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    nodes.forEach((n, i) => {
      const next = nodes[(i + 3) % nodes.length];
      const dist = Math.hypot(n.x - next.x, n.y - next.y);
      if (dist < 230) result.push([i, (i + 3) % nodes.length]);
      const next2 = nodes[(i + 7) % nodes.length];
      const dist2 = Math.hypot(n.x - next2.x, n.y - next2.y);
      if (dist2 < 180) result.push([i, (i + 7) % nodes.length]);
    });
    return result;
  }, [nodes]);

  return (
    <svg
      viewBox="0 0 800 520"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fade" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#050810" stopOpacity="0" />
          <stop offset="100%" stopColor="#050810" stopOpacity="1" />
        </radialGradient>
      </defs>
      <g stroke="#2dd4ff" strokeOpacity="0.16" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i % 5 === 0 ? "#e11d3c" : "#2dd4ff"}
          fillOpacity={i % 5 === 0 ? 0.75 : 0.55}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.35, 0.95, 0.35], scale: [1, 1.25, 1] }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: n.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <rect width="800" height="520" fill="url(#fade)" />
    </svg>
  );
}
