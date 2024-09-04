import { MessagingInterface } from "../events/messaging";
import { Vector } from "../types";
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
): AggregateListener => {
  const speed: Vector = { x: 0, y: 0 };
  return {
    keyListeners: [
      {
        key: "w",
        type: "keydown",
        callback: (e) => {
          if (e.repeat) return;
          speed.y = -1;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "a",
        type: "keydown",
        callback: (e) => {
          if (e.repeat) return;
          speed.x = -1;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "s",
        type: "keydown",
        callback: (e) => {
          if (e.repeat) return;
          speed.y = 1;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "d",
        type: "keydown",
        callback: (e) => {
          if (e.repeat) return;
          speed.x = 1;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "w",
        type: "keyup",
        callback: () => {
          speed.y = 0;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "a",
        type: "keyup",
        callback: () => {
          speed.x = 0;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "s",
        type: "keyup",
        callback: () => {
          speed.y = 0;
          messaging.input(playerId, { speed });
        },
      },
      {
        key: "d",
        type: "keyup",
        callback: () => {
          speed.x = 0;
          messaging.input(playerId, { speed });
        },
      },
    ],
    mouseListeners: [],
  };
};

export default gameController;
