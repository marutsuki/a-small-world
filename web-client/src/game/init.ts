import { Dimensions } from "./types";
import Simulation from "./Simulation";

export default function start(
  canvas: HTMLCanvasElement,
  dimension: Dimensions
) {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get 2D rendering context");
  }

  const world = new Simulation(context, dimension);
  const animator = new Animator(60, () => {
    world.render();
  });

  animator.start();
}

class Animator {
  private lastUpdate: number = 0;
  private frequency: number;
  private callback: () => void;

  public constructor(fps: number, callback: () => void) {
    this.callback = callback;
    this.frequency = 1000 / fps;
  }

  public start() {
    this.lastUpdate = performance.now();
    requestAnimationFrame(this.update.bind(this));
  }

  private update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastUpdate;
    if (deltaTime >= this.frequency) {
      this.lastUpdate = currentTime;
      this.callback();
    }

    requestAnimationFrame(this.update.bind(this));
  }
}
