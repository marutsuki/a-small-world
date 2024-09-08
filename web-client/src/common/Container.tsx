import React, { ReactNode } from 'react';
import { ColourVariant } from '../../tailwind.config';
import { createVariants } from '../colours';

const ContainerVariants = createVariants({
    primary:
        'bg-primary-base-default text-primary-content-default hover:bg-primary-base-hover hover:text-primary-content-hover',
    secondary:
        'bg-secondary-base-default text-secondary-content-default hover:bg-secondary-base-hover hover:text-secondary-content-hover',
    error: 'bg-error-base-default text-error-content-default hover:bg-error-base-hover hover:text-error-content-hover',
    neutral:
        'bg-neutral-base-default text-neutral-content-default hover:bg-neutral-base-hover hover:text-neutral-content-hover',
});

type ContainerProps = {
    children: ReactNode;
    variant?: ColourVariant;
};

const CommonStyling = 'transition duration-100 p-4 bg-opacity-80 ';

const Container: React.FC<ContainerProps> = ({
    children,
    variant = 'primary',
}) => {
    return (
        <div className={CommonStyling.concat(ContainerVariants[variant])}>
            {children}
        </div>
    );
};

export default Container;
