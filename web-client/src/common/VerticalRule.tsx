import { FC } from 'react';

type VerticalRuleProps = {
    height?: number;
};

const DEFAULT_HEIGHT = 40;

/**
 * Component for the a vertical rule in the app's theme.
 */
const VerticalRule: FC<VerticalRuleProps> = ({ height = DEFAULT_HEIGHT }) => (
    <div
        style={{ height }}
        className="h-full border border-l-1 border-r-0 border-primary-content-default w-0"
    />
);

export default VerticalRule;
