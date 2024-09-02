export type Location = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Entity = {
  location: Location;
};

export type Player = Entity & {
  id: string;
};

export type World = {
  id: string;
  players: Record<string, Player>;
  entities: Record<string, Entity>;
  dimension: Dimensions;
};
