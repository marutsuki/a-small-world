import { FC, useState } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { useAppDispatch } from '../store';
import { joinWorld } from './menu.thunks';

/**
 * Component for a menu enabling the user to join a world.
 */
const JoinMenu: FC = () => {
    const [worldId, setWorldId] = useState('');
    const dispatch = useAppDispatch();
    return (
        <Container variant="neutral">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="World ID"
                    className="p-1 text-neutral-content-default"
                    onChange={(e) => setWorldId(e.target.value)}
                />
                <Button
                    id="join-world"
                    variant="secondary"
                    onClick={() => dispatch(joinWorld(worldId))}
                >
                    Join World
                </Button>
            </div>
        </Container>
    );
};

export default JoinMenu;
