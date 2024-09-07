import { FC } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { useAppDispatch } from '../store';
import { createWorld, joinWorld, startWorld } from './menu.thunks';
import { useSelector } from 'react-redux';
import { selectWorldId } from '../game/game.slice';

/**
 * Component for rendering the world creation menu.
 */
const CreateMenu: FC = () => {
    const worldId = useSelector(selectWorldId);
    const dispatch = useAppDispatch();
    return (
        <Container variant="neutral">
            <Button id="create-world" onClick={() => dispatch(createWorld())}>
                Create World
            </Button>
            <Button
                id="start-world"
                disabled={!worldId}
                onClick={() => dispatch(startWorld(worldId || ''))}
            >
                Start World
            </Button>
        </Container>
    );
};

export default CreateMenu;
