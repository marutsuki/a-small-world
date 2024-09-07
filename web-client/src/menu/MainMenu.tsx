import { FC } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import HorizontalRule from '../common/HorizontalRule';
import { useAppDispatch } from '../store';
import { toggleMenu } from './menu.slice';

/**
 * Component for the main menu displayed in the app's entrypoint.
 */
const MainMenu: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <Container variant="neutral">
            <div className="flex flex-col gap-4">
                <Button
                    id="create-world"
                    onClick={() => dispatch(toggleMenu('create'))}
                >
                    Create World
                </Button>
                <HorizontalRule />
                <Button
                    id="join-world"
                    variant="secondary"
                    onClick={() => dispatch(toggleMenu('join'))}
                >
                    Join World
                </Button>
            </div>
        </Container>
    );
};

export default MainMenu;
