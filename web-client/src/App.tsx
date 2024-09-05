import { useState } from 'react';
import './App.css';
import Game from './game/Game';
import Menu from './menu/Menu';
import { Player } from './game/types';

function App() {
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [worldId, setWorldId] = useState<string | null>(null);

    const onJoinWorld = (worldId: string, player: Player) => {
        setWorldId(worldId);
        setPlayerId(player.id);
    };

    return (
        <>
            <Menu onJoinWorld={onJoinWorld} />
            {worldId && playerId && (
                <Game worldId={worldId} playerId={playerId} />
            )}
        </>
    );
}

export default App;
