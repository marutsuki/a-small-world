import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GameState {
    worldId: string | null;
    playerId: string | null;
}

const initialState: GameState = {
    worldId: null,
    playerId: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setActiveWorld: (state, action: PayloadAction<string>) => {
            state.worldId = action.payload;
        },
        setActivePlayer: (state, action: PayloadAction<string>) => {
            state.playerId = action.payload;
        },
        resetGame: (state) => {
            state.worldId = null;
            state.playerId = null;
        },
    },
});

export const { setActiveWorld, setActivePlayer } = gameSlice.actions;

export default gameSlice.reducer;

export const selectGame = (state: RootState) => state.game;

export const selectWorldId = createSelector(selectGame, (game) => game.worldId);

export const selectPlayerId = createSelector(
    selectGame,
    (game) => game.playerId
);
