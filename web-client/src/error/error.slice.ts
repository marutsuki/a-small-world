import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ErrorContext = 'join' | 'create' | 'game';

type State = {
    [context in ErrorContext]: string | null;
};

type SetPayload = {
    /** The context in which the error occurred, this could be a specific menu or in-game. */
    context: ErrorContext;
    /** The error message to show to the user. */
    message: string;
};
const errorSlice = createSlice({
    name: 'error',
    initialState: {
        join: null,
        create: null,
        game: null,
    } as State,
    reducers: {
        setError(state, action: PayloadAction<SetPayload>) {
            state[action.payload.context] = action.payload.message;
        },
        resetError(state, action: PayloadAction<ErrorContext>) {
            state[action.payload] = null;
        },
    },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;

const selectErrors = (state: RootState) => state.errors;

export const selectErrorContext = (context: ErrorContext) =>
    createSelector(selectErrors, (errors) => errors[context]);
