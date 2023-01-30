import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypesModal";

const initState = {
  dataTemplate: [],
  dataNewForm: [],

  nameTypeSelectForm: "type-1",
  inputNameFormStore: "",
  objFile: { inputFile: "", typeFile: "" },
  inputSearchForm: "",
};

const AppStore = createSlice<InitDataType, ActionTypes>({
  name: "new_form_modal",
  initialState: initState as InitDataType,
  reducers: {
    initArrDataTemplate: (state, action) => {
      state.dataTemplate = action.payload;
    },

    initNewForm: (state, action) => {
      state.dataNewForm = action.payload;
    },

    setNameTypeSelectForm: (state, action) => {
      state.nameTypeSelectForm = action.payload;
    },

    setInputNameFormStore: (state, action) => {
      state.inputNameFormStore = action.payload;
    },

    setInputFile: (state, action) => {
      state.objFile = action.payload;
    },

    setInputSearchForm: (state, action) => {
      state.inputSearchForm = action.payload;
    },
  },
});

export const {
  initArrDataTemplate,
  initNewForm,
  setNameTypeSelectForm,
  setInputNameFormStore,
  setInputFile,
  setInputSearchForm,
} = AppStore.actions;

export default AppStore.reducer;
