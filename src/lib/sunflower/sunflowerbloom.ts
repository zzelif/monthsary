// lib/sunflower/SunflowerBloom.ts
import { Point } from "@/lib/tree/point";

export class SunflowerBloom {
  constructor(public point: Point, public scale: number = 1) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.point.x, this.point.y);
    ctx.scale(this.scale, this.scale);

    // Draw petals
    for (let i = 0; i < 12; i++) {
      ctx.rotate((Math.PI * 2) / 12);
      ctx.beginPath();
      ctx.fillStyle = "#FFD700"; // Yellow petals
      ctx.ellipse(0, -10, 4, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw center
    ctx.beginPath();
    ctx.fillStyle = "#8B4513"; // Brown center
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
