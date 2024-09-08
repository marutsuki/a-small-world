import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../environment/config';
import { Player, World } from '../game/types';
import { setActivePlayer, setActiveWorld } from '../game/game.slice';
import { toggleMenu } from './menu.slice';
import { ErrorContext, resetError, setError } from '../error/error.slice';

/**
 * Redux thunk to issue a request to join a world.
 * On success, sets the world ID and player ID to the redux state.
 */
export const joinWorld = createAsyncThunk(
    'world/join',
    async (
        { worldId, context }: { worldId: string; context: ErrorContext },
        { dispatch }
    ) => {
        try {
            // Reset any existing errors from the source of the thunk dispatch
            dispatch(resetError(context));
            console.info('Attempting to join world:', worldId);
            const response = await fetch(serverUrl(`worlds/${worldId}/join`));
            if (response.ok) {
                const player: Player = await response.json();
                dispatch(setActiveWorld(worldId));
                dispatch(setActivePlayer(player.id));
                dispatch(toggleMenu('none'));
            } else {
                console.error('Failed to join world');
                dispatch(
                    setError({
                        context,
                        message: 'Failed to join world.',
                    })
                );
            }
        } catch (e: unknown) {
            console.error('An unexpected error occurred', e);
            dispatch(
                setError({
                    context,
                    message: 'An unexpected error occurred.',
                })
            );
        }
    }
);

/**
 * Redux thunk to issue a request to create a world.
 * On success, sets the world ID to the redux state.
 */
export const createWorld = createAsyncThunk(
    'world/create',
    async ({ context }: { context: ErrorContext }, { dispatch }) => {
        try {
            // Reset any existing errors from the source of the thunk dispatch
            dispatch(resetError(context));
            const response = await fetch(serverUrl('worlds'), {
                method: 'POST',
            });
            if (response.ok) {
                const world: World = await response.json();
                console.info('World created, ID:', world.id);
                dispatch(setActiveWorld(world.id));
            } else {
                // Server error, let the user know something went wrong.
                console.error('Failed to create world.');
                dispatch(
                    setError({
                        context,
                        message: 'Failed to create world.',
                    })
                );
            }
        } catch (e: unknown) {
            // Frontend error
            console.error('Failed to create world', e);
            dispatch(
                setError({
                    context,
                    message: 'An unexpected error occurred.',
                })
            );
        }
    }
);

/**
 * Redux thunk to issue a request to start a world.
 *
 * On success, calls the `joinWorld` thunk.
 */
export const startWorld = createAsyncThunk(
    'world/start',
    async (
        { worldId, context }: { worldId: string; context: ErrorContext },
        { dispatch }
    ) => {
        try {
            // Reset any existing errors from the source of the thunk dispatch
            dispatch(resetError(context));
            const response = await fetch(serverUrl(`worlds/${worldId}/start`));
            if (response.ok) {
                console.info(`World ${worldId} started`);
                dispatch(joinWorld({ worldId, context }));
            } else {
                // Server error, let the user know something went wrong.
                console.error('Failed to start world');
                dispatch(
                    setError({
                        context,
                        message: 'Failed to start world.',
                    })
                );
            }
        } catch (e: unknown) {
            // Frontend error
            console.error('Failed to start world', e);
            dispatch(
                setError({
                    context,
                    message: 'An unexpected error occurred.',
                })
            );
        }
    }
);
