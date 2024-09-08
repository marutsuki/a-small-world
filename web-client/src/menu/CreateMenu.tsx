import { FC } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { useAppDispatch } from '../store';
import { createWorld, startWorld } from './menu.thunks';
import { useSelector } from 'react-redux';
import { selectWorldId } from '../game/game.slice';
import VerticalRule from '../common/VerticalRule';
import { selectErrorContext } from '../error/error.slice';
import ErrorAlert from '../error/ErrorAlert';

/**
 * Component for rendering the world creation menu.
 */
const CreateMenu: FC = () => {
    const worldId = useSelector(selectWorldId);
    const error = useSelector(selectErrorContext('create'));
    const dispatch = useAppDispatch();
    return (
        <Container variant="neutral">
            <div className="flex flex-col gap-5">
                <div className="flex justify-center items-center gap-5">
                    <Button
                        id="create-world"
                        border
                        disabled={!!worldId}
                        onClick={() =>
                            dispatch(createWorld({ context: 'create' }))
                        }
                    >
                        Create World
                    </Button>
                    <VerticalRule />
                    <Button
                        id="start-world"
                        border
                        disabled={!worldId}
                        onClick={() =>
                            dispatch(
                                startWorld({
                                    worldId: worldId || '',
                                    context: 'create',
                                })
                            )
                        }
                    >
                        Start World
                    </Button>
                </div>
                {worldId && (
                    <span>
                        <b className="select-none">World ID:</b>
                        <span className=" font-code">{worldId}</span>
                    </span>
                )}
                {error && <ErrorAlert message={error} />}
            </div>
        </Container>
    );
};

export default CreateMenu;
