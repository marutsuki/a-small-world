import { FC, useCallback } from "react";
import { controller } from "./control/game-controller";
import initialize from "./events/messaging";
import { movement } from "./movement/controller";
import World, { WorldAPI } from "./World";
import initializeWorld from "./init";

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
      const [api, start, stop] = initializeWorld(canvas);
      // Initialize messaging client with callbacks to update the simulation
      const messaging = initializeMessaging(playerId, worldId, api);
      api.addObservers(controller(messaging), movement());

      start();

      return () => stop();
    },
    [worldId, playerId]
  );
  return (
    <canvas id="game-canvas" ref={initGame} width={800} height={600}>
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

const initializeMessaging = (
  playerId: string,
  worldId: string,
  api: WorldAPI
) => {
  const messaging = initialize(playerId, worldId, {
    onConnect: () => messaging?.spawn(),
    onSpawn: ({ entityId, entity }) => {
      api.put(entityId, entity);
    },
    onDespawn: ({ entityId }) => {
      api.remove(entityId);
    },
    onInput: ({ entityId, input }) => {
      console.log(input);
      api.patch(entityId, { input });
    },
  });
  return messaging;
};
export default Game;
