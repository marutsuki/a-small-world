import { useEffect, useState } from 'react';

type ScreenSize = {
    width: number;
    height: number;
};

const getScreenSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
};
