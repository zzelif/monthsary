//lib/tree/point.ts

export class Point {
  constructor(public x: number = 0, public y: number = 0) {}

  clone(): Point {
    return new Point(this.x, this.y);
  }

  add(p: Point): Point {
    return new Point(this.x + p.x, this.y + p.y);
  }

  sub(p: Point): Point {
    return new Point(this.x - p.x, this.y - p.y);
  }

  div(n: number): Point {
    return new Point(this.x / n, this.y / n);
  }

  mul(n: number): Point {
    return new Point(this.x * n, this.y * n);
  }
}
