import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { controller } from './control/game-controller';
import initialize, { MessagingInterface } from './events/messaging';
import { movement } from './movement/controller';
import { WorldAPI } from './World';
import initializeWorld from './init';
import locator from './location/locator';
import { useSelector } from 'react-redux';
import { selectGame } from './game.slice';
import { useScreenSize } from './hooks';
import Button from '../common/Button';

/**
 * The game canvas.
 */
const Game: FC = () => {
    const messager = useRef<MessagingInterface>();
    const [typing, setTyping] = useState(false);
    const [message, setMessage] = useState('');
    const { worldId, playerId } = useSelector(selectGame);
    const screenSize = useScreenSize();

    const initGame = useCallback(
        async (canvas: HTMLCanvasElement) => {
            if (!worldId || !playerId) {
                return;
            }
            // Retrieve world details
            // const world: World = await (
            //   await fetch(serverUrl(`worlds/${worldId}`))
            // ).json();
            const [api, start, stop] = initializeWorld(canvas);
            // Initialize messaging client with callbacks to update the simulation
            const messaging = initializeMessaging(playerId, worldId, api);
            messager.current = messaging;
            api.addObservers(
                controller(messaging),
                movement(),
                locator(playerId, messaging)
            );

            start();

            return () => stop();
        },
        [worldId, playerId]
    );

    const sendMessage = useCallback(() => {
        if (messager.current) {
            messager.current.message(message);
        }
    }, [message]);

    useEffect(() => {
        const el = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                if (message.length > 0) {
                    sendMessage();
                }
                setTyping((t) => !t);
                setMessage('');
            }
        };
        addEventListener('keypress', el);

        return () => removeEventListener('keypress', el);
    }, [message, sendMessage]);

    return (
        <section>
            <canvas
                id="game-canvas"
                className="relative z-0 bg-black"
                ref={initGame}
                width={screenSize.width}
                height={screenSize.height}
            >
                Your browser does not support the HTML5 canvas tag.
            </canvas>
            {typing && (
                <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                    <input
                        className="p-1 text-neutral-content-default"
                        type="text"
                        placeholder="Type something..."
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <Button id="send-button" onClick={sendMessage}>
                        Send
                    </Button>
                </div>
            )}
        </section>
    );
};

const initializeMessaging = (
    playerId: string,
    worldId: string,
    api: WorldAPI
) => {
    const messaging = initialize(playerId, worldId, {
        onConnect: () => messaging?.spawn(),
        onLocate: ({ entityId, location }) => {
            const e = api.entity(entityId);
            if (e !== null) {
                e.location = location;
            } else {
                api.put(entityId, { location });
            }
        },
        onSpawn: ({ entityId, entity }) => {
            api.put(entityId, entity);
        },
        onDespawn: ({ entityId }) => {
            api.remove(entityId);
        },
        onInput: ({ entityId, input }) => {
            api.patch(entityId, { input });
        },
        onMessage: ({ entityId, message }) => {
            console.log('received message', message);
        },
    });
    return messaging;
};
export default Game;
