import { FC } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { useAppDispatch } from '../store';
import { createWorld, joinWorld, startWorld } from './menu.thunks';
import { useSelector } from 'react-redux';
import { selectWorldId } from '../game/game.slice';
import VerticalRule from '../common/VerticalRule';

/**
 * Component for rendering the world creation menu.
 */
const CreateMenu: FC = () => {
    const worldId = useSelector(selectWorldId);
    const dispatch = useAppDispatch();
    return (
        <Container variant="neutral">
            <div className="flex flex-col gap-5">
                <div className="flex justify-center items-center gap-5">
                    <Button
                        id="create-world"
                        border
                        disabled={!!worldId}
                        onClick={() => dispatch(createWorld())}
                    >
                        Create World
                    </Button>
                    <VerticalRule />
                    <Button
                        id="start-world"
                        border
                        disabled={!worldId}
                        onClick={() => dispatch(startWorld(worldId || ''))}
                    >
                        Start World
                    </Button>
                </div>
                {worldId && (
                    <span>
                        <b className="select-none">World ID:</b>{' '}
                        <span className=" font-code">{worldId}</span>
                    </span>
                )}
            </div>
        </Container>
    );
};

export default CreateMenu;
