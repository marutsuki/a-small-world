import { FC } from 'react';
import Menus from '../menu/Menus';
import Game from '../game/Game';

const Main: FC = () => {
    return (
        <div className="relative flex flex-col items-center">
            <Menus />
            <Game />
        </div>
    );
};

export default Main;
