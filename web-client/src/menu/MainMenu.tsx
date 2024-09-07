import { FC } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { Menu } from '../App';
import HorizontalRule from '../common/HorizontalRule';

type MenuProps = {
    onChangeMenu: (menu: Menu) => void;
};

/**
 * Component for the main menu displayed in the app's entrypoint.
 */
const MainMenu: FC<MenuProps> = ({ onChangeMenu }) => {
    return (
        <Container variant="neutral">
            <div className="flex flex-col gap-4">
                <Button
                    id="create-world"
                    onClick={() => onChangeMenu('create')}
                >
                    Create World
                </Button>
                <HorizontalRule />
                <Button
                    id="join-world"
                    variant="secondary"
                    onClick={() => onChangeMenu('join')}
                >
                    Join World
                </Button>
            </div>
        </Container>
    );
};

export default MainMenu;
