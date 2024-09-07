import { useState } from 'react';
import './App.css';
import Game from './game/Game';
import MainMenu from './menu/MainMenu';
import JoinMenu from './menu/JoinMenu';
import CreateMenu from './menu/CreateMenu';
import { Player } from './game/types';

export type Menu = 'main' | 'join' | 'create';

function App() {
    const [activeMenu, setActiveMenu] = useState<Menu | null>('main');
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [worldId, setWorldId] = useState<string | null>(null);

    const onJoinWorld = (worldId: string, player: Player) => {
        setWorldId(worldId);
        setPlayerId(player.id);
    };

    const ActiveMenu = () => {
        switch (activeMenu) {
            case 'join':
                return <JoinMenu onJoinWorld={onJoinWorld} />;
            case 'create':
                return <CreateMenu onJoinWorld={onJoinWorld} />;
            default:
                return <MainMenu onChangeMenu={setActiveMenu} />;
        }
    };
    return (
        <>
            <ActiveMenu />
            {worldId && playerId && (
                <Game worldId={worldId} playerId={playerId} />
            )}
        </>
    );
}

export default App;
