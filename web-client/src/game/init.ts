import World, { WorldAPI } from "./World";

/**
 * Initializes the simulation.
 *
 * @param canvas the canvas element to render to
 * @param dimension the dimensions of the world
 * @returns the {@link Simulation} instance
 */
export default function initializeWorld(
  canvas: HTMLCanvasElement
): [WorldAPI, () => void, () => void] {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get 2D rendering context");
  }

  const sim = new World(context);
  const animator = new Animator(
    60,
    () => sim.update(),
    () => sim.start(),
    () => sim.stop()
  );

  return [sim.api, () => animator.start(), () => animator.stop()];
}

/** A simple animator that updates the simulation at a fixed frame rate.*/
class Animator {
  private lastFrame: number = -1;
  /** The last time the animation frame was updated. */
  private lastUpdate: number = 0;
  /** The frequency to update the simulation. */
  private frequency: number;

  /**
   * Creates a new {@link Animator} instance.
   *
   * @param fps the frames per second
   * @param callback the callback to update the simulation
   */
  public constructor(
    fps: number,
    private callback: () => void,
    private onStart: () => void,
    private onStop: () => void
  ) {
    this.frequency = 1000 / fps;
  }

  /**
   * Starts the animation loop.
   */
  public start() {
    this.onStart();
    this.lastUpdate = performance.now();
    this.lastFrame = requestAnimationFrame(this.update.bind(this));
  }

  public stop() {
    cancelAnimationFrame(this.lastFrame);
    this.onStop();
  }
  /**
   * An animation update frame.
   */
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
