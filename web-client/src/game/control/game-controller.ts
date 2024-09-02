import { MessagingInterface } from "../events/messaging";
import { AggregateListener } from "./listener";

/**
 * Creates a {@link AggregateListener} instance that allows the user to control
 * the player entity using the keyboard.
 *
 * @param playerId the ID of the player entity
 * @param messaging the messaging interface to send move events
 * @returns an {@link AggregateListener} instance
 */
const gameController = (
  playerId: string,
  messaging: MessagingInterface
): AggregateListener => ({
  keyListeners: [
    {
      key: "w",
      type: "keydown",
      callback: () => {
        messaging.move(playerId, { x: 0, y: -1 });
      },
    },
    {
      key: "a",
      type: "keydown",
      callback: () => {
        messaging.move(playerId, { x: -1, y: 0 });
      },
    },
    {
      key: "s",
      type: "keydown",
      callback: () => {
        messaging.move(playerId, { x: 0, y: 1 });
      },
    },
    {
      key: "d",
      type: "keydown",
      callback: () => {
        messaging.move(playerId, { x: 1, y: 0 });
      },
    },
  ],
  mouseListeners: [],
});

export default gameController;
