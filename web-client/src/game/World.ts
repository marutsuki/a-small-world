import { Entity } from "./types";

export default class World {
  private entities: Map<string, Entity> = new Map();
  public constructor(private context: CanvasRenderingContext2D) {}

  public put(id: string, entity: Entity) {
    this.entities.set(id, entity);
  }

  public patch(id: string, entity: Partial<Entity>) {
    const oldState = this.entities.get(id);
    if (oldState) {
      Object.assign(oldState, entity);
    }
  }

  public remove(id: string) {
    this.entities.delete(id);
  }

  public update() {
    for (const entity of this.entities.values()) {
      this.updateEntity(entity);
    }
    this.render();
  }

  private render() {
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

  public updateEntity(entity: Entity) {
    if (entity.input) {
      entity.location.x += entity.input.speed.x;
      entity.location.y += entity.input.speed.y;
    }
  }
}
