import { FC, useState } from 'react';
import { serverUrl } from '../environment/config';
import { Player, World } from '../game/types';
import Button from '../common/Button';

type MenuProps = {
    onJoinWorld: (worldId: string, player: Player) => void;
};
const Menu: FC<MenuProps> = ({ onJoinWorld }) => {
    const [worldId, setWorldId] = useState('');

    const createWorld = async () => {
        try {
            const response = await fetch(serverUrl('worlds'), {
                method: 'POST',
            });
            if (response.ok) {
                const world: World = await response.json();
                setWorldId(world.id);
                console.info('World created');
            } else {
                console.error('Failed to join world');
            }
        } catch (e: unknown) {
            console.error('Failed to create world', e);
        }
    };

    const startWorld = async () => {
        try {
            const response = await fetch(serverUrl(`worlds/${worldId}/start`));
            if (response.ok) {
                console.info(`World ${worldId} started`);
            } else {
                console.error('Failed to start world');
            }
        } catch (e: unknown) {
            console.error('Failed to start world', e);
        }
    };

    const joinWorld = async () => {
        try {
            const response = await fetch(serverUrl(`worlds/${worldId}/join`));
            if (response.ok) {
                const player: Player = await response.json();
                onJoinWorld(worldId, player);
            } else {
                console.error('Failed to join world');
            }
        } catch (e: unknown) {
            console.error('Failed to join world', e);
        }
    };

    return (
        <div>
            <Button id="create-world" onClick={createWorld}>Create World</Button>
            <input type="text" onChange={(e) => setWorldId(e.target.value)} />
            <Button id="start-world" onClick={startWorld}>Start World</Button>
            <Button id="join-world" onClick={joinWorld}>Join World</Button>
        </div>
    );
};

export default Menu;
