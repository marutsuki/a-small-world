import { FC, useCallback } from "react";
import { World } from "./types";
import start from "./init";
import { serverUrl } from "../environment/config";
import initialize from "./events/messaging";
import listen from "./control/listener";
import gameController from "./control/game-controller";

type GameProps = {
  worldId: string;
  playerId: string;
};
const Game: FC<GameProps> = ({ worldId, playerId }) => {
  const initGame = useCallback(
    async (canvas: HTMLCanvasElement) => {
      const world: World = await (
        await fetch(serverUrl(`worlds/${worldId}`))
      ).json();
      const simulation = start(canvas, world.dimension);
      const messaging = initialize(worldId, {
        onConnect: () => messaging.spawn(playerId),
        onUpsert: ({ entityId, entity }) => {
          simulation.put(entityId, entity);
        },
        onDelete: ({ entityId }) => {
          simulation.remove(entityId);
        },
      });
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
