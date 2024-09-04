import { FC, useCallback } from "react";
import start from "./init";
import { simulator } from "./simulation";

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
      const stop = start(canvas, simulator({ worldId, playerId }));

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

export default Game;
