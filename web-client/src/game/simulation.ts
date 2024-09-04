import gameController from "./control/game-controller";
import listen from "./control/listener";
import initialize, { MessagingInterface } from "./events/messaging";
import type { WorldControl } from "./init";
import { EntityInput } from "./types";

export const simulator = ({
  worldId,
  playerId,
}: {
  worldId: string;
  playerId: string;
}): WorldControl => {
  const { listener, state } = gameController();
  let oldInput: EntityInput | null = null;

  let messaging: MessagingInterface | null;
  let stopListening: () => void | null;
  return {
    onStart: function (world): void {
      // Initialize messaging client with callbacks to update the simulation
      messaging = initialize(worldId, {
        onConnect: () => messaging?.spawn(playerId),
        onSpawn: ({ entityId, entity }) => {
          world.put(entityId, entity);
        },
        onDespawn: ({ entityId }) => {
          world.remove(entityId);
        },
        onInput: ({ entityId, input }) => {
          world.patch(entityId, { input });
        },
      });

      // Start listening for user input
      stopListening = listen(listener);
    },
    onUpdate: function (): void {
      if (newInput(oldInput, state.input)) {
        messaging?.input(playerId, state.input);
        oldInput = { speed: { ...state.input.speed } };
      }
    },
    onStop: function (): void {
      messaging?.deactivate();
      stopListening();
    },
  };
};

const newInput = (
  oldInput: EntityInput | null,
  newInput: EntityInput
): boolean =>
  oldInput === null ||
  oldInput.speed.x !== newInput.speed.x ||
  oldInput.speed.y !== newInput.speed.y;
