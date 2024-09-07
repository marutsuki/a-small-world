import { FC, useState } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { Player } from '../game/types';
import { serverUrl } from '../environment/config';

type JoinMenuProps = {
    onJoinWorld: (worldId: string, player: Player) => void;
};

/**
 * Component for a menu enabling the user to join a world.
 */
const JoinMenu: FC<JoinMenuProps> = ({ onJoinWorld }) => {
    const [worldId, setWorldId] = useState('');
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
        <Container variant="neutral">
            <input type="text" onChange={(e) => setWorldId(e.target.value)} />
            <Button id="join-world" variant="secondary" onClick={joinWorld}>
                Join World
            </Button>
        </Container>
    );
};

export default JoinMenu;
