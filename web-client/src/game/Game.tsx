import { FC, useCallback } from "react";
import { World } from "./types";
import start from "./init";
import { serverUrl } from "../environment/config";
import initialize from "./events/messaging";

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
      return () => {
        messaging.deactivate();
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
