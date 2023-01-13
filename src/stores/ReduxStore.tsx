import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

const initState = {
  title: "React",
};

const AppStore = createSlice<InitDataType, ActionTypes>({
  name: "new_form_modal",
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
