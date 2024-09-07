import { FC } from 'react';
import MainMenu from './MainMenu';
import JoinMenu from './JoinMenu';
import CreateMenu from './CreateMenu';
import { useSelector } from 'react-redux';
import { selectActiveMenu } from './menu.slice';

const Menus: FC = () => {
    const activeMenu = useSelector(selectActiveMenu);

    switch (activeMenu) {
        case 'join':
            return <JoinMenu />;
        case 'create':
            return <CreateMenu />;
        case 'main':
            return <MainMenu />;
        case 'none':
            return null;
    }
};

export default Menus;
