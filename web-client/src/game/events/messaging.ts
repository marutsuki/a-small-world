import { Client } from '@stomp/stompjs';
import { serverUrl } from '../../environment/config';
import { DespawnEvent, InputEvent, LocateEvent, SpawnEvent } from './types';
import { Location, Vector } from '../types';

type InputMessage = {
    speed: Vector;
};

/** Messaging interface for interacting with the event broker. */
export type MessagingInterface = {
    spawn: () => void;
    input: (input: InputMessage) => void;
    deactivate: () => void;
    locate: (location: Location) => void;
};

/** Callbacks for the event topics.*/
export type MessageReceiver = {
    onConnect: () => void;
    onSpawn: (event: SpawnEvent) => void;
    onDespawn: (event: DespawnEvent) => void;
    onInput: (event: InputEvent) => void;
    onLocate: (event: LocateEvent) => void;
};

/**
 * Initializes the messaging client.
 *
 * @param worldId the ID of the context world
 * @param param1 callbacks for the event topics
 * @returns
 */
export default function initialize(
    playerId: string,
    worldId: string,
    { onConnect, onSpawn, onDespawn, onInput, onLocate }: MessageReceiver
): MessagingInterface {
    console.info('Initializing messaging client');
    const client = new Client({
        brokerURL: serverUrl('events', 'ws'),
        onConnect: () => {
            console.info('Connected to events endpoint');

            // Endpoint for entity upsert events
            client.subscribe(`/topic/${worldId}/spawn`, (message) => {
                const event: SpawnEvent = JSON.parse(message.body);
                console.debug('Received spawn event', event);
                onSpawn(event);
            });

            // Endpoint for entity deletion events
            client.subscribe(`/topic/${worldId}/despawn`, (message) => {
                const event: DespawnEvent = JSON.parse(message.body);
                console.debug('Received despawn event', event);
                onDespawn(event);
            });

            // Endpoint for entity input events
            client.subscribe(`/topic/${worldId}/input`, (message) => {
                const event: InputEvent = JSON.parse(message.body);
                console.debug('Received input event', event);
                onInput(event);
            });

            // Endpoint for entity location events
            client.subscribe(`/topic/${worldId}/locate`, (message) => {
                const event: LocateEvent = JSON.parse(message.body);
                console.debug('Received locate event', event);
                onLocate(event);
            });

            onConnect();
        },
    });

    client.activate();

    return {
        spawn: () =>
            client.publish({
                destination: `/publish/${worldId}/player/${playerId}/spawn`,
            }),
        input: (input) =>
            client.publish({
                destination: `/publish/${worldId}/player/${playerId}/input`,
                body: JSON.stringify(input),
            }),
        deactivate: () => client.deactivate(),
        locate: (location) =>
            client.publish({
                destination: `/publish/${worldId}/player/${playerId}/locate`,
                body: JSON.stringify(location),
            }),
    };
}
