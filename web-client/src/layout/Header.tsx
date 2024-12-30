import { FC } from 'react';

const Header: FC = () => (
    <header className="px-2 py-1 relative z-20 w-screen bg-neutral-base-default text-neutral-content-default h-[50px]">
        <h1 className="text-4xl font-bold font-code">
            a small world<span className="animate-blink">_</span>
        </h1>
    </header>
);

export default Header;
