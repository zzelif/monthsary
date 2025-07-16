//lib/tree/footer.ts

import { Point } from "@/lib/tree/point";
import { Tree } from "./tree";

export class Footer {
  point: Point;
  length: number = 0;

  constructor(
    private tree: Tree,
    public width: number,
    public height: number,
    public speed: number = 2
  ) {
    this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
  }

  draw() {
    const ctx = this.tree.ctx;
    const len = this.length / 2;

    ctx.save();
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = this.height;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.translate(this.point.x, this.point.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.lineTo(-len, 0);
    ctx.stroke();
    ctx.restore();

    if (this.length < this.width) {
      this.length += this.speed;
    }
  }
}
