import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Menu = 'main' | 'join' | 'create' | 'none';

type State = {
    activeMenu: Menu;
};
const menuSlice = createSlice({
    name: 'menu',
    initialState: { activeMenu: 'main' } as State,
    reducers: {
        toggleMenu: (state, action: PayloadAction<Menu>) => {
            state.activeMenu = action.payload;
        },
    },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;

const selectMenus = (state: RootState) => state.menus;

export const selectActiveMenu = createSelector(
    selectMenus,
    (menus) => menus.activeMenu
);
