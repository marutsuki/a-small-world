import { Entity, EntityInput, Location } from "../types";

/** An event describing the joining a player from the server. */
export type LocateEvent = {
  entityId: string;
  location: Location;
};

/** An event describing an upsert of an {@link Entity} from the server. */
export type SpawnEvent = {
  entityId: string;
  entity: Entity;
};

/** An event describing the deletion of an {@link Entity} from the server. */
export type DespawnEvent = {
  entityId: string;
};

/** An event describing the input of an {@link Entity} from the server. */
export type InputEvent = {
  entityId: string;
  input: EntityInput;
};
