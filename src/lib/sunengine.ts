// lib/sunflower/initSunflowerTreeEngine.ts
import { SunflowerTree } from "@/lib/sunflower/tree";

export function initSunflowerTreeEngine(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  const tree = new SunflowerTree(canvas, ctx, width, height);
  tree.preloadBlooms(20);

  let state: "drop" | "grow" | "flower" = "drop";

  const loop = () => {
    ctx.clearRect(0, 0, width, height);

    tree.update();

    if (state === "drop") {
      if (tree.seed.canScale()) {
        tree.seed.scale(0.95);
      } else if (tree.seed.canMove()) {
        tree.seed.move(0, 2);
      } else {
        state = "grow";
      }
    } else if (state === "grow") {
      const growing = tree.canGrow();
      if (!growing) state = "flower";
    } else if (state === "flower") {
      if (tree.canFlower()) tree.flower(1);
    }

    requestAnimationFrame(loop);
  };

  loop();
}
