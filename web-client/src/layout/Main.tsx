import { FC } from 'react';
import Menus from '../menu/Menus';
import Game from '../game/Game';

const Main: FC = () => {
    return (
        <div className="relative flex flex-col items-center">
            <div className="absolute z-20 top-1/2 -translate-y-1/2">
                <Menus />
            </div>
            <Game />
        </div>
    );
};

export default Main;
