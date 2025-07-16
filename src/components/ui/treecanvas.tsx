//components/ui/treecanvas.tsx

"use client";

import { useEffect, useRef } from "react";
import { initTreeEngine } from "@/lib/treeengine";

export default function HeartTreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    initTreeEngine(canvas);
  }, []);

  return (
    <div className="mt-8 w-full h-[680px] flex items-center justify-center relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
