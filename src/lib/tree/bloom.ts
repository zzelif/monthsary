//lib/tree/bloom.ts

import { Point } from "@/lib/tree/point";
import { Heart } from "@/lib/tree/heart";
import { Tree } from "./tree";

export class Bloom {
  constructor(
    private tree: Tree,
    public point: Point,
    private figure: Heart,
    public color: string = `rgb(255,${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)})`,
    public alpha: number = Math.random() * 0.7 + 0.3,
    public angle: number = Math.random() * 360,
    public scale: number = 0.4,
    public place?: Point,
    public speed?: number
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.point.x, this.point.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < this.figure.length; i++) {
      const p = this.figure.get(i);
      ctx.lineTo(p.x, -p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  flower() {
    this.draw(this.tree.ctx);
    this.scale += 0.1;
    if (this.scale > 1) {
      this.tree.removeBloom(this);
    }
  }

  jump() {
    if (!this.place || this.speed === undefined) return;
    if (this.point.x < -20 || this.point.y > this.tree.height + 20) {
      this.tree.removeBloom(this);
    } else {
      this.draw(this.tree.ctx);
      this.point = this.place.sub(this.point).div(this.speed).add(this.point);
      this.angle += 0.05;
      this.speed -= 1;
    }
  }
}
