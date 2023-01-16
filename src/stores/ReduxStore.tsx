import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

const initState = {
  dataTemplate: [],
  arrDataNewForm: [],
  nameTypeSelectForm: "Start From Scratch",
  inputNameFormStore: "",
  inputFile: "",
};

const AppStore = createSlice<InitDataType, ActionTypes>({
  name: "new_form_modal",
  initialState: initState as InitDataType,
  reducers: {
    initArrDataTemplate: (state, action) => {
      state.dataTemplate = action.payload;
    },

    newFormModal: (state, action) => {
      state.arrDataNewForm = action.payload;
    },

    setNameTypeSelectForm: (state, action) => {
      state.nameTypeSelectForm = action.payload;
    },

    setInputNameFormStore: (state, action) => {
      state.inputNameFormStore = action.payload;
    },

    setInputFile: (state, action) => {
      state.inputFile = action.payload;
    },
  },
});

export const {
  initArrDataTemplate,
  newFormModal,
  setNameTypeSelectForm,
  setInputNameFormStore,
  setInputFile,
} = AppStore.actions;

export default AppStore.reducer;
