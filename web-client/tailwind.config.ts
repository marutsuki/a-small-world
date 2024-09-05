import { Config } from 'tailwindcss';

type ColourContext = 'base' | 'content';

type ColourVariant = 'primary' | 'secondary' | 'error';

type ColourMode = 'default' | 'hover' | 'active' | 'disabled';

type Theme = {
    [C in ColourContext]: {
        [V in ColourVariant]: {
            [M in ColourMode]: string;
        };
    };
};

export const colors: Theme = {
    base: {
        primary: {
            default: '#3D5AFE',
            hover: '#303F9F',
            active: '#8C9EFF',
            disabled: '#78909C',
        },
        secondary: {
            default: '#00BCD4',
            hover: '#1565C0',
            active: '#80DEEA',
            disabled: '#78909C',
        },
        error: {
            default: '#D32F2F',
            hover: '#B71C1C',
            active: '#FF8A80',
            disabled: '#78909C',
        },
    },
    content: {
        primary: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
        secondary: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
        error: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
    },
};

const config: Config = {
    content: [],
    theme: {
        extend: {
            colors,
        },
    },
    plugins: [],
};
export default config;
