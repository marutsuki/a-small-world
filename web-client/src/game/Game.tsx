import { FC, useCallback } from "react";
import { World } from "./types";
import start from "./init";
import { serverUrl } from "../environment/config";

type GameProps = {
  worldId: string;
};
const Game: FC<GameProps> = ({ worldId }) => {
  const initGame = useCallback(
    async (canvas: HTMLCanvasElement) => {
      const world: World = await (
        await fetch(serverUrl(`worlds/${worldId}`))
      ).json();
      start(canvas, world.dimension);
    },
    [worldId]
  );
  return (
    <canvas id="game-canvas" ref={initGame} width={800} height={600}>
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default Game;
