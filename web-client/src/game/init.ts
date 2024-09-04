import Simulation from "./Simulation";

/**
 * Initializes the simulation.
 *
 * @param canvas the canvas element to render to
 * @param dimension the dimensions of the world
 * @returns the {@link Simulation} instance
 */
export default function start(canvas: HTMLCanvasElement): Simulation {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get 2D rendering context");
  }

  const sim = new Simulation(context);
  const animator = new Animator(60, () => {
    sim.update();
  });

  animator.start();

  return sim;
}

/** A simple animator that updates the simulation at a fixed frame rate.*/
class Animator {
  /** The last time the animation frame was updated. */
  private lastUpdate: number = 0;
  /** The frequency to update the simulation. */
  private frequency: number;
  /** The callback to update the simulation. */
  private callback: () => void;

  /**
   * Creates a new {@link Animator} instance.
   *
   * @param fps the frames per second
   * @param callback the callback to update the simulation
   */
  public constructor(fps: number, callback: () => void) {
    this.callback = callback;
    this.frequency = 1000 / fps;
  }

  /**
   * Starts the animation loop.
   */
  public start() {
    this.lastUpdate = performance.now();
    requestAnimationFrame(this.update.bind(this));
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
