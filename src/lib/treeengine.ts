// lib/treeengine.ts

import { Tree } from "./tree/tree";
import type { TreeOptions, BranchConfig } from "./tree/tree";

export function initTreeEngine(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;

  const options: TreeOptions = {
    seed: {
      x: width / 2 - 20,
      color: "rgb(190, 26, 37)",
      scale: 2,
    },
    branch: [
      [
        535,
        680,
        570,
        250,
        500,
        200,
        30,
        100,
        [
          [
            540,
            500,
            455,
            417,
            340,
            400,
            13,
            100,
            [[450, 435, 434, 430, 394, 395, 2, 40]],
          ],
          [
            550,
            445,
            600,
            356,
            680,
            345,
            12,
            100,
            [[578, 400, 648, 409, 661, 426, 3, 80]],
          ],
          [539, 281, 537, 248, 534, 217, 3, 40],
          [
            546,
            397,
            413,
            247,
            328,
            244,
            9,
            80,
            [
              [427, 286, 383, 253, 371, 205, 2, 40],
              [498, 345, 435, 315, 395, 330, 4, 60],
            ],
          ],
          [
            546,
            357,
            608,
            252,
            678,
            221,
            6,
            100,
            [[590, 293, 646, 277, 648, 271, 2, 80]],
          ],
        ],
      ],
    ] as BranchConfig[],
    bloom: {
      num: 1000,
    },
    footer: {
      width: 1200,
      height: 5,
      speed: 10,
    },
  };

  const tree = new Tree(canvas, width, height, options);
  const seed = tree.seed;
  const foot = tree.footer;

  let hold = false;

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log("Canvas clicked at", x, y);
    if (seed.hover(x, y)) {
      hold = false;
      canvas.style.cursor = "default";
      console.log("Heart clicked! Starting animation...");
    }
  });

  const run = async () => {
    seed.draw();
    while (hold) await new Promise((r) => setTimeout(r, 10));

    while (seed.canScale()) {
      seed.scale(0.95);
      await new Promise((r) => setTimeout(r, 10));
    }

    while (seed.canMove()) {
      seed.move(0, 2);
      foot.draw();
      await new Promise((r) => setTimeout(r, 10));
    }

    while (tree.canGrow()) {
      tree.grow();
      await new Promise((r) => setTimeout(r, 10));
    }

    while (tree.canFlower()) {
      tree.flower(2);
      await new Promise((r) => setTimeout(r, 10));
    }
  };

  run();
}
