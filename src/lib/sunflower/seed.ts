//lib/sunflower/seed.ts

export class Seed {
  x: number;
  y: number;
  velocity: number;
  settled: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velocity = 3;
    this.settled = false;
  }

  update(canvasHeight: number) {
    if (!this.settled) {
      this.y += this.velocity;
      if (this.y >= canvasHeight - 10) {
        this.settled = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#deb887"; // sunflower seed brown
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 5, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
