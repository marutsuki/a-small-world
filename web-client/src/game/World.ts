import { Entity } from "./types";

export type WorldAPI = {
  entity: (id: string) => Entity | null;
  put: (id: string, entity: Entity) => void;
  patch: (id: string, entity: Partial<Entity>) => void;
  remove: (id: string) => void;
  forEach: (callback: (entity: Entity) => void) => void;
  addObservers: (...observer: Observer[]) => void;
};

export type Observer = Partial<{
  onStart: (api: WorldAPI) => void;
  onUpdate: (api: WorldAPI) => void;
  onStop: () => void;
}>;

export default class World {
  private observers: Observer[] = [];
  private entities: Map<string, Entity> = new Map();
  private started = false;
  public constructor(private context: CanvasRenderingContext2D) {}

  public addObservers(...observer: Observer[]): void {
    this.observers.push(...observer);
  }

  public start() {
    if (this.started) {
      return;
    }
    this.observers.forEach((observer) => observer.onStart?.(this.api));
  }

  public update() {
    if (!this.started) {
      this.start();
      this.started = true;
    }
    this.observers.forEach((observer) => observer.onUpdate?.(this.api));
    this.render();
  }

  public stop() {
    if (!this.started) {
      return;
    }
    this.observers.forEach((observer) => observer.onStop?.());
    this.observers = [];
    this.entities.clear();
  }

  public render() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
    this.context.fillStyle = "black";
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    this.entities.forEach((entity) => {
      this.context.fillStyle = "white";
      this.context.fillRect(entity.location.x, entity.location.y, 10, 10);
    });
  }

  public get api(): WorldAPI {
    return {
      entity: this.entity.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
      remove: this.remove.bind(this),
      forEach: this.forEach.bind(this),
      addObservers: this.addObservers.bind(this),
    };
  }

  private entity(id: string): Entity | null {
    return this.entities.get(id) || null;
  }

  private put(id: string, entity: Entity) {
    this.entities.set(id, entity);
  }

  private patch(id: string, entity: Partial<Entity>) {
    const oldState = this.entities.get(id);
    if (oldState) {
      Object.assign(oldState, entity);
    }
  }

  private remove(id: string) {
    this.entities.delete(id);
  }

  private forEach(callback: (entity: Entity) => void) {
    this.entities.forEach(callback);
  }
}
