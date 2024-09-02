import { Client } from "@stomp/stompjs";
import { serverUrl } from "../../environment/config";
import { Entity, Location } from "../types";
import { DeleteEvent, UpsertEvent } from "./types";
import { on } from "events";

export type MessagingInterface = {
  spawn: (playerId: string) => void;
  move: (playerId: string, location: Location) => void;
  deactivate: () => void;
};

export type MessageReceiver = {
  onConnect: () => void;
  onUpsert: (event: UpsertEvent) => void;
  onDelete: (event: DeleteEvent) => void;
};
export default function initialize(
  worldId: string,
  { onConnect, onUpsert, onDelete }: MessageReceiver
): MessagingInterface {
  console.info("Initializing messaging client");
  const client = new Client({
    brokerURL: serverUrl("events", "ws"),
    onConnect: () => {
      console.info("Connected to events endpoint");
      client.subscribe(`/topic/${worldId}/upsert`, (message) => {
        const event: UpsertEvent = JSON.parse(message.body);
        console.debug("Received upsert event", event);
        onUpsert(event);
      });
      client.subscribe(`/topic/${worldId}/delete`, (message) => {
        const event: DeleteEvent = JSON.parse(message.body);
        console.info("Received delete event", event);
        onDelete(event);
      });
      onConnect();
    },
  });

  client.activate();

  return {
    spawn: (playerId) =>
      client.publish({
        destination: `/publish/${worldId}/player/${playerId}/spawn`,
      }),
    move: (playerId, location) =>
      client.publish({
        destination: `/publish/${worldId}/player/${playerId}/move`,
        body: JSON.stringify(location),
      }),
    deactivate: () => client.deactivate(),
  };
}
