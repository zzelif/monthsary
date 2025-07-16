// lib/sunflower/SunflowerBranch.ts
import { Point } from "@/lib/tree/point";

export class SunflowerBranch {
  private len: number = 0;
  private t: number;
  private radius: number;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public p0: Point,
    public p1: Point,
    public p2: Point,
    private maxLen: number = 100,
    radius: number = 8
  ) {
    this.radius = radius;
    this.t = 1 / (this.maxLen - 1);
  }

  private bezier(t: number): Point {
    const p1 = this.p0.mul((1 - t) * (1 - t));
    const p2 = this.p1.mul(2 * (1 - t) * t);
    const p3 = this.p2.mul(t * t);
    return p1.add(p2).add(p3);
  }

  public grow(): boolean {
    if (this.len > this.maxLen) return false;

    const point = this.bezier(this.len * this.t);
    this.draw(point);

    this.len++;
    this.radius *= 0.97;
    return true;
  }

  private draw(p: Point) {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#228B22"; // green stem
    ctx.shadowBlur = 1;
    ctx.shadowColor = "#145214";
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
