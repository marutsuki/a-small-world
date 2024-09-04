export type Vector = {
  x: number;
  y: number;
};

export type Location = Vector;

export type Dimensions = {
  width: number;
  height: number;
};

export type Entity = {
  location: Location;
  input?: EntityInput;
};

export type Player = Entity & {
  id: string;
};

export type EntityInput = {
  speed: Vector;
};

export type World = {
  id: string;
  players: Record<string, Player>;
  entities: Record<string, Entity>;
  dimension: Dimensions;
};
