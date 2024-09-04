import { FC, useCallback } from "react";
import start from "./init";
import initialize from "./events/messaging";
import listen from "./control/listener";
import gameController from "./control/game-controller";

type GameProps = {
  /** The ID of the world to join. */
  worldId: string;
  /** The ID of the player entity. */
  playerId: string;
};

/**
 * The game canvas.
 */
const Game: FC<GameProps> = ({ worldId, playerId }) => {
  const initGame = useCallback(
    async (canvas: HTMLCanvasElement) => {
      // Retrieve world details
      // const world: World = await (
      //   await fetch(serverUrl(`worlds/${worldId}`))
      // ).json();
      const simulation = start(canvas);

      // Initialize messaging client with callbacks to update the simulation
      const messaging = initialize(worldId, {
        onConnect: () => messaging.spawn(playerId),
        onSpawn: ({ entityId, entity }) => {
          simulation.put(entityId, entity);
        },
        onDespawn: ({ entityId }) => {
          simulation.remove(entityId);
        },
        onInput: ({ entityId, input }) => {
          simulation.patch(entityId, { input });
        },
      });

      // Start listening for user input
      const stopListening = listen(gameController(playerId, messaging));

      return () => {
        messaging.deactivate();
        stopListening();
      };
    },
    [worldId, playerId]
  );
  return (
    <canvas id="game-canvas" ref={initGame} width={800} height={600}>
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default Game;
