"use client";

import { useEffect, useRef } from "react";

type Particle = {
  t: number;
  speedT: number;
  maxT: number;
  scale: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

export default function IntroHeartCanvas({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sentenceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ["#ff6b6b", "#ffe66d", "#4ecdc4"];

    function heartShape(t: number, scale: number) {
      return {
        x: scale * (16 * Math.pow(Math.sin(t), 3)),
        y:
          scale *
          (13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)),
      };
    }

    const scale = Math.min(
      (canvas.width - 100) / 32,
      (canvas.height * 0.65) / 26
    );
    const maxHearts = Math.floor(scale * 5);
    const heartSize = scale / 3;

    for (
      let i = 0, hearts = 0;
      hearts < maxHearts;
      i += Math.PI * Math.random(), hearts++
    ) {
      const position = heartShape(i, scale);
      const maxT =
        (Math.random() * 0.008 + 0.00005) * (Math.random() > 0.5 ? 1 : -1);
      particles.push({
        t: i,
        speedT: 0,
        maxT,
        scale,
        x: position.x + canvas.width / 2,
        y: -position.y + canvas.height / 2,
        size: Math.random() * heartSize + 5,
        speedX: 0,
        speedY: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function drawParticles() {
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    }

    function updateParticles() {
      particles.forEach((p) => {
        p.t += p.speedT;
        const pos = heartShape(p.t, p.scale);
        p.x = pos.x + canvas.width / 2;
        p.y = -pos.y + canvas.height / 2;
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffcfcf";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }

    function heartAnimate() {
      updateParticles();
      heartAnimateId = requestAnimationFrame(heartAnimate);
    }

    let animationId: number;
    let heartAnimateId: number;
    let speedupId: number;
    let slowDownId: number;

    animate();
    heartAnimate();

    setTimeout(() => {
      particles.forEach((p) => {
        p.speedT = p.maxT / 50;
      });
      speedupId = requestAnimationFrame(function speedUp() {
        particles.forEach((p) => {
          p.speedT =
            p.maxT > 0
              ? Math.min(p.maxT, p.speedT + (p.maxT - p.speedT) / 150)
              : Math.max(p.maxT, p.speedT + (p.maxT - p.speedT) / 150);
        });
        speedupId = requestAnimationFrame(speedUp);
      });
    }, 500);

    setTimeout(() => {
      cancelAnimationFrame(speedupId);
    }, 2000);

    setTimeout(() => {
      slowDownId = requestAnimationFrame(function slowDown() {
        particles.forEach((p) => {
          p.speedT *= 0.99;
        });
        slowDownId = requestAnimationFrame(slowDown);
      });
    }, 6000);

    setTimeout(() => {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(heartAnimateId);
      cancelAnimationFrame(slowDownId);
      particles.forEach((p) => {
        p.speedX = (Math.random() - 0.5) * 10;
        p.speedY = (Math.random() - 0.5) * 10;
      });

      requestAnimationFrame(function explode() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // ✨ This prevents the trail
        ctx.fillStyle = "#ffcfcf";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
        });
        drawParticles();
        requestAnimationFrame(explode);
      });

      if (sentenceRef.current) {
        sentenceRef.current.style.bottom = "50%";
        sentenceRef.current.style.opacity = "1";
        sentenceRef.current.style.fontSize = "24px";
      }

      setTimeout(onFinish, 3000);
    }, 8000);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-[#ffefef] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={sentenceRef}
        className="text-center text-4xl text-pink-600 font-bold transition-all opacity-0"
        style={{
          position: "absolute",
          bottom: "-200px",
          fontSize: "0",
        }}
      >
        Happy Monthsary, Adi!
        <br />
        <span id="month">2</span> Months!
      </div>
    </div>
  );
}
