import { MessagingInterface } from "../events/messaging";
import { AggregateListener } from "./listener";

const gameController = (
  playerId: string,
  messaging: MessagingInterface
): AggregateListener => ({
  keyListeners: [
    {
      key: "w",
      callback: (event) => {
        messaging.move(playerId, { x: 0, y: -1 });
      },
    },
    {
      key: "a",
      callback: (event) => {
        messaging.move(playerId, { x: -1, y: 0 });
      },
    },
    {
      key: "s",
      callback: (event) => {
        messaging.move(playerId, { x: 0, y: 1 });
      },
    },
    {
      key: "d",
      callback: (event) => {
        messaging.move(playerId, { x: 1, y: 0 });
      },
    },
  ],
  mouseListeners: [],
});

export default gameController;
