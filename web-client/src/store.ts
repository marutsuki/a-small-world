import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gameReducer from './game/game.slice';
import menuReducer from './menu/menu.slice';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: {
        game: gameReducer,
        menus: menuReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
