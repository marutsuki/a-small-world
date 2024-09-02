import { Dimensions, Entity } from "./types";

export default class Simulation {
  private entities: Map<string, Entity> = new Map();
  public constructor(
    private context: CanvasRenderingContext2D,
    private dimensions: Dimensions
  ) {}

  public put(id: string, entity: Entity) {
    this.entities.set(id, entity);
  }

  public remove(id: string) {
    this.entities.delete(id);
  }

  public render() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.context.fillStyle = "black";
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    this.entities.forEach((entity) => {
      this.context.fillStyle = "white";
      this.context.fillRect(entity.location.x, entity.location.y, 10, 10);
    });
  }
}
