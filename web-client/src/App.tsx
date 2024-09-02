import { useState } from "react";
import "./App.css";
import Game from "./game/Game";
import Menu from "./menu/Menu";

function App() {
  const [worldId, setWorldId] = useState<string | null>(null);
  return (
    <>
      <Menu onJoinWorld={(worldId) => setWorldId(worldId)} />
      {worldId && <Game worldId={worldId} />}
    </>
  );
}

export default App;
