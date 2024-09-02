import { Entity } from "../types";

export type UpsertEvent = {
  entityId: string;
  entity: Entity;
};

export type DeleteEvent = {
  entityId: string;
};
