import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../environment/config';
import { Player, World } from '../game/types';
import { setActivePlayer, setActiveWorld } from '../game/game.slice';

export const joinWorld = createAsyncThunk(
    'world/join',
    async (worldId: string, { dispatch }) => {
        try {
            console.info('Attempting to join world:', worldId);
            const response = await fetch(serverUrl(`worlds/${worldId}/join`));
            if (response.ok) {
                const player: Player = await response.json();
                dispatch(setActiveWorld(worldId));
                dispatch(setActivePlayer(player.id));
            } else {
                console.error('Failed to join world');
            }
        } catch (e: unknown) {
            console.error('Failed to join world', e);
        }
    }
);

export const createWorld = createAsyncThunk(
    'world/create',
    async (_, { dispatch }) => {
        try {
            const response = await fetch(serverUrl('worlds'), {
                method: 'POST',
            });
            if (response.ok) {
                const world: World = await response.json();
                console.info('World created, ID:', world.id);
                dispatch(setActiveWorld(world.id));
            } else {
                console.error('Failed to join world');
            }
        } catch (e: unknown) {
            console.error('Failed to create world', e);
        }
    }
);

export const startWorld = createAsyncThunk(
    'world/start',
    async (worldId: string, { dispatch }) => {
        try {
            const response = await fetch(serverUrl(`worlds/${worldId}/start`));
            if (response.ok) {
                console.info(`World ${worldId} started`);
            } else {
                console.error('Failed to start world');
            }
            dispatch(joinWorld(worldId));
        } catch (e: unknown) {
            console.error('Failed to start world', e);
        }
    }
);
