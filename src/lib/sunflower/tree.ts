// import { Point } from "@/lib/tree/point";
// import { Seed } from "@/lib/tree/seed";
// import { Footer } from "@/lib/tree/footer";
// import { SunflowerBloom } from "@/lib/sunflower/sunflowerbloom";
// import { SunflowerBranch } from "@/lib/sunflower/branch";

// export class SunflowerTree {
//   public seed: Seed;
//   public footer: Footer;
//   private branches: SunflowerBranch[] = [];
//   private blooms: SunflowerBloom[] = [];
//   private bloomCache: SunflowerBloom[] = [];

//   constructor(
//     public canvas: HTMLCanvasElement,
//     public ctx: CanvasRenderingContext2D,
//     public width: number,
//     public height: number
//   ) {
//     this.seed = new Seed(this, new Point(width / 2, height / 2), 1.5);
//     this.footer = new Footer(this, width, 5, 8);
//     this.initBranches();
//   }

//   private initBranches() {
//     const base = new Point(this.width / 2, this.height);
//     const control = new Point(this.width / 2 + 20, this.height - 200);
//     const tip = new Point(this.width / 2, this.height - 300);

//     const branch = new SunflowerBranch(this.ctx, base, control, tip, 100);
//     this.branches.push(branch);
//   }

//   public update() {
//     this.seed.drawCircle();
//     this.footer.draw();

//     let stillGrowing = false;
//     for (const b of this.branches) {
//       const growing = b.grow();
//       if (growing) stillGrowing = true;
//     }

//     // Draw blooms if all branches done
//     if (!stillGrowing && this.bloomCache.length > 0) {
//       this.flower(2);
//     }

//     // Draw blooms
//     for (const bloom of this.blooms) {
//       bloom.draw(this.ctx);
//     }
//   }

//   public canGrow(): boolean {
//     return this.branches.some((b) => b.grow());
//   }

//   public canFlower(): boolean {
//     return this.bloomCache.length > 0;
//   }

//   public flower(n: number) {
//     const toBloom = this.bloomCache.splice(0, n);
//     this.blooms.push(...toBloom);
//   }

//   public preloadBlooms(count: number = 30) {
//     for (let i = 0; i < count; i++) {
//       const x = this.width / 2 + (Math.random() * 40 - 20);
//       const y = this.height - 320 + Math.random() * 30;
//       const scale = 0.6 + Math.random() * 0.6;
//       this.bloomCache.push(new SunflowerBloom(new Point(x, y), scale));
//     }
//   }
// }
