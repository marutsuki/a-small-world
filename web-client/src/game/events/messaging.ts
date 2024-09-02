import { Client } from "@stomp/stompjs";
import { serverUrl } from "../../environment/config";
import { Location } from "../types";
import { DeleteEvent, UpsertEvent } from "./types";

/** Messaging interface for interacting with the event broker. */
export type MessagingInterface = {
  spawn: (playerId: string) => void;
  move: (playerId: string, location: Location) => void;
  deactivate: () => void;
};

/** Callbacks for the event topics.*/
export type MessageReceiver = {
  onConnect: () => void;
  onUpsert: (event: UpsertEvent) => void;
  onDelete: (event: DeleteEvent) => void;
};

/**
 * Initializes the messaging client.
 * 
 * @param worldId the ID of the context world
 * @param param1 callbacks for the event topics
 * @returns 
 */
export default function initialize(
  worldId: string,
  { onConnect, onUpsert, onDelete }: MessageReceiver
): MessagingInterface {
  console.info("Initializing messaging client");
  const client = new Client({
    brokerURL: serverUrl("events", "ws"),
    onConnect: () => {
      console.info("Connected to events endpoint");

      // Endpoint for entity upsert events
      client.subscribe(`/topic/${worldId}/upsert`, (message) => {
        const event: UpsertEvent = JSON.parse(message.body);
        console.debug("Received upsert event", event);
        onUpsert(event);
      });

      // Endpoint for entity deletion events
      client.subscribe(`/topic/${worldId}/delete`, (message) => {
        const event: DeleteEvent = JSON.parse(message.body);
        console.debug("Received delete event", event);
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
