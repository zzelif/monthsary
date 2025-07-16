//lib/tree/tree.ts

import { Point } from "@/lib/tree/point";
import { Seed } from "@/lib/tree/seed";
import { Footer } from "@/lib/tree/footer";
import { Branch } from "@/lib/tree/branch";
import { Bloom } from "@/lib/tree/bloom";

export interface SeedOptions {
  x: number;
  y?: number;
  color?: string;
  scale?: number;
}

export type BranchConfig = [
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  radius: number,
  length: number,
  children?: BranchConfig[]
];

export interface BloomOptions {
  num: number;
}

export interface TreeOptions {
  seed: SeedOptions;
  branch: BranchConfig[];
  bloom: BloomOptions;
  footer: {
    width: number;
    height: number;
    speed: number;
  };
}

export class Tree {
  ctx: CanvasRenderingContext2D;
  seed: Seed;
  footer: Footer;
  width: number;
  height: number;
  branchList: Branch[] = [];
  blooms: Bloom[] = [];
  bloomCache: Bloom[] = [];

  private bezier(p1: Point, p2: Point, p3: Point, t: number): Point {
    const a = p1.mul((1 - t) * (1 - t));
    const b = p2.mul(2 * (1 - t) * t);
    const c = p3.mul(t * t);
    return a.add(b).add(c);
  }

  private collectAllBranches(branches: Branch[]): Branch[] {
    const all: Branch[] = [];

    const walk = (branch: Branch) => {
      all.push(branch);
      for (const b of branch.children) {
        const child = new Branch(
          this,
          new Point(b[0], b[1]),
          new Point(b[2], b[3]),
          new Point(b[4], b[5]),
          b[6],
          b[7],
          b[8] ?? []
        );
        walk(child);
      }
    };

    for (const b of branches) {
      walk(b);
    }

    return all;
  }

  constructor(
    public canvas: HTMLCanvasElement,
    width: number,
    height: number,
    public opt: TreeOptions
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.width = width;
    this.height = height;
    this.seed = new Seed(
      this,
      new Point(opt.seed.x, opt.seed.y ?? height / 2),
      opt.seed.scale ?? 1,
      opt.seed.color ?? "#FF0000"
    );
    this.footer = new Footer(
      this,
      opt.footer.width,
      opt.footer.height,
      opt.footer.speed
    );
    this.initBranches(opt.branch);
    this.initBlooms(opt.bloom);
  }

  initBranches(branches: BranchConfig[]) {
    for (const b of branches) {
      const [x1, y1, x2, y2, x3, y3, r, l, children] = b;
      const branch = new Branch(
        this,
        new Point(x1, y1),
        new Point(x2, y2),
        new Point(x3, y3),
        r,
        l,
        children ?? []
      );
      this.branchList.push(branch);
    }
  }

  initBlooms(bloomOpt: BloomOptions) {
    const { num } = bloomOpt;
    const heart = this.seed.heart.figure;
    for (let i = 0; i < num; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      this.bloomCache.push(new Bloom(this, new Point(x, y), heart));
    }
  }

  draw(): void {}

  addBranch(branch: Branch) {
    this.branchList.push(branch);
  }

  addBranches(branches: BranchConfig[]) {
    for (const b of branches) {
      this.branchList.push(
        new Branch(
          this,
          new Point(b[0], b[1]),
          new Point(b[2], b[3]),
          new Point(b[4], b[5]),
          b[6],
          b[7],
          b[8] ?? []
        )
      );
    }
  }

  removeBranch(branch: Branch) {
    const idx = this.branchList.indexOf(branch);
    if (idx !== -1) this.branchList.splice(idx, 1);
  }

  grow() {
    for (const b of this.branchList) b.grow();
  }

  canGrow(): boolean {
    return this.branchList.length > 0;
  }

  addBloom(b: Bloom) {
    this.blooms.push(b);
  }

  removeBloom(b: Bloom) {
    const idx = this.blooms.indexOf(b);
    if (idx !== -1) this.blooms.splice(idx, 1);
  }

  canFlower(): boolean {
    return this.bloomCache.length > 0;
  }

  flower(n: number) {
    const flowers = this.bloomCache.splice(0, n);
    this.blooms.push(...flowers);
    const ctx = this.ctx;
    for (const f of flowers) {
      f.draw(ctx);
    }
  }
}
