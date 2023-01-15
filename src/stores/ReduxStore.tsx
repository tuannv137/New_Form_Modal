import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

const initState: InitDataType = {
  dataTemplate: [],
};

const AppStore = createSlice<InitDataType, ActionTypes>({
  name: "new_form_modal",
  initialState: initState as InitDataType,
  reducers: {
    changeTitle: (state, action) => {},

    initArrDataTemplate: (state, action) => {
      state.dataTemplate = action.payload;
    },
  },
});

export const { changeTitle, initArrDataTemplate } = AppStore.actions;

export default AppStore.reducer;
