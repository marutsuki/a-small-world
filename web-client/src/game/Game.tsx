import { FC, useCallback } from "react";
import { controller } from "./control/game-controller";
import initialize from "./events/messaging";
import { movement } from "./movement/controller";
import { WorldAPI } from "./World";
import initializeWorld from "./init";
import locator from "./location/locator";

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
      api.addObservers(
        controller(messaging),
        movement(),
        locator(playerId, messaging)
      );

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
    onLocate: ({ entityId, location }) => {
      const e = api.entity(entityId);
      if (e !== null) {
        e.location = location;
      } else {
        api.put(entityId, { location });
      }
    },
    onSpawn: ({ entityId, entity }) => {
      api.put(entityId, entity);
    },
    onDespawn: ({ entityId }) => {
      api.remove(entityId);
    },
    onInput: ({ entityId, input }) => {
      api.patch(entityId, { input });
    },
  });
  return messaging;
};
export default Game;
