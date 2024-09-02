import { FC, useState } from "react";
import { serverUrl } from "../environment/config";

type MenuProps = {
  onJoinWorld: (worldId: string) => void;
};
const Menu: FC<MenuProps> = ({ onJoinWorld }) => {
  const [worldId, setWorldId] = useState("");

  const createWorld = () =>
    fetch(serverUrl("worlds"), {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            onJoinWorld(data.id);
          });
        }
      })
      .catch((error) => {
        console.error("Failed to create world", error);
      });

  const startWorld = () =>
    fetch(serverUrl(`worlds/${worldId}/start`)).then((response) => {
      if (response.ok) {
        console.info(`World ${worldId} started`);
      } else {
        console.error("Failed to join world");
      }
    });

  const joinWorld = () =>
    fetch(serverUrl(`worlds/${worldId}/join`)).then((response) => {
      if (response.ok) {
        onJoinWorld(worldId);
      } else {
        console.error("Failed to join world");
      }
    });

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
