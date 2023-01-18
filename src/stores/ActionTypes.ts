import type { PayloadAction } from "@reduxjs/toolkit";

export type ActionTypes = {
  initArrDataTemplate: (
    state: InitDataType,
    action: PayloadAction<Data[]>
  ) => void;

  newFormModal: (state: InitDataType, action: PayloadAction<Data[]>) => void;

  setNameTypeSelectForm: (
    state: InitDataType,
    action: PayloadAction<"type-1" | "type-2" | "type-3" | "type-4" | string>
  ) => void;

  setInputNameFormStore: (
    state: InitDataType,
    action: PayloadAction<string>
  ) => void;

  setInputFile: (
    state: InitDataType,
    action: PayloadAction<{ inputFile?: string; typeFile?: string }>
  ) => void;

  setInputSearchForm: (
    state: InitDataType,
    action: PayloadAction<string>
  ) => void;
};
