import type { PayloadAction } from "@reduxjs/toolkit";
import type { UiSelect } from "./ReduxStore";

export type ActionTypes = {
  initDataUI: (
    state: UiSelect,
    action: PayloadAction<{ dataOptions: DATA_UI[] }>
  ) => void;

  initFlatData: (
    state: UiSelect,
    action: PayloadAction<{ flatData: DATA_UI[] }>
  ) => void;

  addSelectoptions: (state: UiSelect, action: PayloadAction<DATA_UI[]>) => void;

  deleteOptionSelected: (
    state: UiSelect,
    action: PayloadAction<DATA_UI[]>
  ) => void;

  setIsInputSearchRef: (
    state: UiSelect,
    action: PayloadAction<boolean>
  ) => void;

  changeElementFocused: (state: UiSelect, action: PayloadAction<any>) => void;

  setIsLoading: (state: UiSelect, action: PayloadAction<boolean>) => void;
};
