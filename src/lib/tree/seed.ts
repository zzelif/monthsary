//lib/tree/seed.ts

import { Point } from "@/lib/tree/point";
import { Heart } from "@/lib/tree/heart";
import { Tree } from "./tree";

export class Seed {
  heart: { point: Point; scale: number; color: string; figure: Heart };
  circle: { point: Point; scale: number; color: string; radius: number };

  constructor(
    public tree: Tree,
    public point: Point,
    scale: number = 1,
    color: string = "#FFC0CB"
  ) {
    const figure = new Heart();
    this.heart = { point, scale, color, figure };
    this.circle = { point, scale, color, radius: 5 };
    this.point = point;
  }

  draw() {
    // this.drawHeart();
    // this.drawText();
  }

  clear() {
    const { x, y } = this.circle.point;
    const w = this.circle.radius * this.circle.scale;
    this.tree.ctx.clearRect(x - w, y - w, 4 * w, 4 * w);
  }

  drawCircle() {
    const ctx = this.tree.ctx;
    const { point, color, scale, radius } = this.circle;

    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  scale(factor: number) {
    this.clear();
    this.heart.scale *= factor;
  }

  move(x: number, y: number) {
    this.clear();
    this.circle.point = this.circle.point.add(new Point(x, y));
    this.drawCircle();
  }

  canMove(): boolean {
    return this.circle.point.y < this.tree.height + 20;
  }

  canScale(): boolean {
    return this.heart.scale > 0.2;
  }

  hover(x: number, y: number): boolean {
    const pixel = this.tree.ctx.getImageData(x, y, 1, 1);
    return pixel.data[3] === 255;
  }
}
