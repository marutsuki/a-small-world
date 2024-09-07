import { Config } from 'tailwindcss';

type ColourContext = 'base' | 'content';

export type ColourVariant = 'primary' | 'secondary' | 'error' | 'neutral';

type ColourMode = 'default' | 'hover' | 'active' | 'disabled';

type Theme = {
    [C in ColourVariant]: {
        [V in ColourContext]: {
            [M in ColourMode]: string;
        };
    };
};

export const colors: Theme = {
    primary: {
        base: {
            default: '#3D5AFE',
            hover: '#303F9F',
            active: '#8C9EFF',
            disabled: '#78909C',
        },
        content: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
    },
    secondary: {
        base: {
            default: '#00BCD4',
            hover: '#1565C0',
            active: '#80DEEA',
            disabled: '#78909C',
        },
        content: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
    },
    error: {
        base: {
            default: '#D32F2F',
            hover: '#B71C1C',
            active: '#FF8A80',
            disabled: '#78909C',
        },
        content: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
    },
    neutral: {
        base: {
            default: '#78909C',
            hover: '#546E7A',
            active: '#B0BEC5',
            disabled: '#78909C',
        },
        content: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
    },
};

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors,
        },
    },
    plugins: [],
};
export default config;
