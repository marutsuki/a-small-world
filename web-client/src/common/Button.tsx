import { FC } from 'react';
import { ColourVariant } from '../../tailwind.config';
import { VariantConfig } from '../colours';

const CommonStyling = 'transition duration-100 ';

export const ButtonVariants: VariantConfig = Object.freeze({
    primary: 'bg-primary-base-default text-primary-content-default',
    secondary: 'bg-secondary-base-default text-secondary-content-base-default',
    error: 'bg-error-base-default text-error-content-default',
});

type ButtonProps = {
    id: string;
    variant?: ColourVariant;
    children: React.ReactNode;
    onClick: () => void;
};

export const Button: FC<ButtonProps> = ({
    id,
    variant = 'primary',
    children,
    onClick,
}) => {
    return (
        <button
            id={id}
            className={CommonStyling.concat(ButtonVariants[variant])}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
