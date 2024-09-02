import { Entity } from "../types";

/** An event describing an upsert of an {@link Entity} from the server. */
export type UpsertEvent = {
  entityId: string;
  entity: Entity;
};

/** An event describing the deletion of an {@link Entity} from the server. */
export type DeleteEvent = {
  entityId: string;
};
