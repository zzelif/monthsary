//lib/tree/heart.ts

import { Point } from "@/lib/tree/point";

export class Heart {
  points: Point[] = [];
  length: number = 0;

  constructor() {
    for (let i = 10; i < 30; i += 0.2) {
      const t = i / Math.PI;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      this.points.push(new Point(x, y));
    }
    this.length = this.points.length;
  }

  get(index: number, scale: number = 1): Point {
    return this.points[index].mul(scale);
  }
}
