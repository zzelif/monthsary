//lib/tree/branch.ts

import { Point } from "@/lib/tree/point";
import { Tree } from "./tree";
import type { BranchConfig } from "./tree";

function bezier(cp: Point[], t: number): Point {
  const p1 = cp[0].mul((1 - t) * (1 - t));
  const p2 = cp[1].mul(2 * t * (1 - t));
  const p3 = cp[2].mul(t * t);
  return p1.add(p2).add(p3);
}

export class Branch {
  len = 0;
  t = 0;

  constructor(
    public tree: Tree,
    public p1: Point,
    public p2: Point,
    public p3: Point,
    public radius: number,
    public length: number,
    public children: BranchConfig[] = []
  ) {
    this.t = 1 / (this.length - 1);
  }

  grow() {
    if (this.len <= this.length) {
      const p = bezier([this.p1, this.p2, this.p3], this.len * this.t);
      this.draw(p);
      this.len++;
      this.radius *= 0.97;
    } else {
      this.tree.removeBranch(this);
      this.tree.addBranches(this.children);
    }
  }

  draw(p: Point) {
    const ctx = this.tree.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#FFC0CB";
    ctx.shadowBlur = 2;
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
