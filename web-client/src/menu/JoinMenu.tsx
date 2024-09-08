import { FC, useState } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { useAppDispatch } from '../store';
import { joinWorld } from './menu.thunks';
import { selectErrorContext } from '../error/error.slice';
import { useSelector } from 'react-redux';
import ErrorAlert from '../error/ErrorAlert';

/**
 * Component for a menu enabling the user to join a world.
 */
const JoinMenu: FC = () => {
    const [worldId, setWorldId] = useState('');
    const error = useSelector(selectErrorContext('join'));
    const dispatch = useAppDispatch();
    return (
        <Container variant="neutral">
            <div className="flex flex-col gap-5">
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
                        onClick={() =>
                            dispatch(
                                joinWorld({ worldId: worldId, context: 'join' })
                            )
                        }
                    >
                        Join World
                    </Button>
                </div>
                {error && <ErrorAlert message={error} />}
            </div>
        </Container>
    );
};

export default JoinMenu;
