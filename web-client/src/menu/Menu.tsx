import { FC, useState } from "react";
import { serverUrl } from "../environment/config";
import { Player, World } from "../game/types";

type MenuProps = {
  onJoinWorld: (worldId: string, player: Player) => void;
};
const Menu: FC<MenuProps> = ({ onJoinWorld }) => {
  const [worldId, setWorldId] = useState("");

  const createWorld = async () => {
    try {
      const response = await fetch(serverUrl("worlds"), {
        method: "POST",
      });
      if (response.ok) {
        const world: World = await response.json();
        setWorldId(world.id);
        console.info("World created");
      } else {
        console.error("Failed to join world");
      }
    } catch (e: unknown) {
      console.error("Failed to create world", e);
    }
  };

  const startWorld = async () => {
    try {
      const response = await fetch(serverUrl(`worlds/${worldId}/start`));
      if (response.ok) {
        console.info(`World ${worldId} started`);
      } else {
        console.error("Failed to start world");
      }
    } catch (e: unknown) {
      console.error("Failed to start world", e);
    }
  };

  const joinWorld = async () => {
    try {
      const response = await fetch(serverUrl(`worlds/${worldId}/join`));
      if (response.ok) {
        const player: Player = await response.json();
        onJoinWorld(worldId, player);
      } else {
        console.error("Failed to join world");
      }
    } catch (e: unknown) {
      console.error("Failed to join world", e);
    }
  };

  return (
    <div>
      <button onClick={createWorld}>Create World</button>
      <input type="text" onChange={(e) => setWorldId(e.target.value)} />
      <button onClick={startWorld}>Start World</button>
      <button onClick={joinWorld}>Join World</button>
    </div>
  );
};

export default Menu;
