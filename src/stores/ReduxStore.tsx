import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

const initState = {
    title: "React",
};

const AppStore = createSlice<InitDataType, ActionTypes>({
    name: "app_name",
    initialState: initState as InitDataType,
    reducers: {
        changeTitle: (state, action) => {
            state.title = action.payload.title;
        },
        initStore: (state, action) => {
            state.title = action.payload.title;
        },
    },
});

export const { changeTitle, initStore } = AppStore.actions;

export default AppStore.reducer;
