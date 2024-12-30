export type Vector = {
    x: number;
    y: number;
};

export type Location = Vector;

export type Dimensions = {
    width: number;
    height: number;
};

type Polygon = {
    // For simplicity, just render a fixed dimensions square
    type: 'polygon';
};

type Text = {
    type: 'text';
    content: string;
};
type EntityType = Polygon | Text;

export type Entity = {
    location: Location;
    input?: EntityInput;
} & EntityType;

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
