import { FC, useState } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { Player, World } from '../game/types';
import { serverUrl } from '../environment/config';

type JoinMenuProps = {
    onJoinWorld: (worldId: string, player: Player) => void;
};

/**
 * Component for rendering the world creation menu.
 */
const CreateMenu: FC<JoinMenuProps> = ({ onJoinWorld }) => {
    const [worldId, setWorldId] = useState('');
    const createWorld = async () => {
        try {
            const response = await fetch(serverUrl('worlds'), {
                method: 'POST',
            });
            if (response.ok) {
                const world: World = await response.json();
                console.info('World created, ID:', world.id);
                setWorldId(world.id);
            } else {
                console.error('Failed to join world');
            }
        } catch (e: unknown) {
            console.error('Failed to create world', e);
        }
    };

    const startWorld = async () => {
        try {
            let response = await fetch(serverUrl(`worlds/${worldId}/start`));
            if (response.ok) {
                console.info(`World ${worldId} started`);
            } else {
                console.error('Failed to start world');
            }
            // TODO: this is not pretty, should start using redux
            response = await fetch(serverUrl(`worlds/${worldId}/join`));
            if (response.ok) {
                const player: Player = await response.json();
                onJoinWorld(worldId, player);
            } else {
                console.error('Failed to join world');
            }
        } catch (e: unknown) {
            console.error('Failed to start world', e);
        }
    };

    return (
        <Container variant="neutral">
            <Button id="create-world" onClick={createWorld}>
                Create World
            </Button>
            <Button id="start-world" onClick={startWorld}>
                Start World
            </Button>
        </Container>
    );
};

export default CreateMenu;
