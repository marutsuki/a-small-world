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
            default: '#e65555',
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
            default: '#000000',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#ffffff',
        },
    },
};

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            code: ['"Source Code Pro"', 'monospace'],
        },
        extend: {
            colors,
            animation: {
                blink: 'blink 1s step-start infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
