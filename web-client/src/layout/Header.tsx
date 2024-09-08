import { FC } from 'react';

const Header: FC = () => (
    <header className="px-2 py-1 absolute z-20 w-full bg-neutral-base-default text-neutral-content-default">
        <h1 className="text-4xl font-bold font-code">
            a small world<span className="animate-blink">_</span>
        </h1>
    </header>
);

export default Header;
