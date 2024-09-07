import { FC } from 'react';
import { ColourVariant } from '../../tailwind.config';
import { createVariants } from '../colours';

const CommonStyling = 'transition duration-100 select-none cursor-pointer ';

const ButtonVariants = createVariants({
    primary:
        'bg-primary-base-default text-primary-content-default hover:bg-primary-base-hover hover:text-primary-content-hover disabled:bg-primary-base-disabled disabled:text-primary-content-disabled',
    secondary:
        'bg-secondary-base-default text-secondary-content-default hover:bg-secondary-base-hover hover:text-secondary-content-hover disabled:bg-secondary-base-disabled disabled:text-secondary-content-disabled',
    error: 'bg-error-base-default text-error-content-default hover:bg-error-base-hover hover:text-error-content-hover disabled:bg-error-base-disabled disabled:text-error-content-disabled',
    neutral:
        'bg-neutral-base-default text-neutral-content-default hover:bg-neutral-base-hover hover:text-neutral-content-hover disabled:bg-neutral-base-disabled disabled:text-neutral-content-disabled',
});

type ButtonProps = {
    /** The ID of the button element. */
    id: string;
    /** The colour variant of the button, defaults to `primary` */
    variant?: ColourVariant;
    /** The content of the button. */
    children: React.ReactNode;
    /** The function to call when the button is clicked. */
    onClick: () => void;
    /** If the button should be disabled. */
    disabled?: boolean;
};

/**
 * Generic button component.
 */
export const Button: FC<ButtonProps> = ({
    variant = 'primary',
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            className={CommonStyling.concat(ButtonVariants[variant])}
        >
            {children}
        </button>
    );
};

export default Button;
