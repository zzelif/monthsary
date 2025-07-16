export class Bloom {
  x: number;
  y: number;
  size: number;
  maxSize: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = 18 + Math.random() * 10;
  }

  update() {
    if (this.size < this.maxSize) {
      this.size += 0.5;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    for (let i = 0; i < 12; i++) {
      ctx.rotate((Math.PI * 2) / 12);
      ctx.beginPath();
      ctx.fillStyle = "#FFD700";
      ctx.ellipse(
        0,
        -this.size,
        this.size / 2.5,
        this.size / 1.8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "#8B4513";
    ctx.arc(0, 0, this.size / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
