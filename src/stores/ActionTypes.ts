import type { PayloadAction } from "@reduxjs/toolkit";

export type ActionTypes = {
  initArrDataTemplate: (
    state: InitDataType,
    action: PayloadAction<Data[]>
  ) => void;

  initArrFormSelect: (
    state: InitDataType,
    action: PayloadAction<Data[]>
  ) => void;

  newFormModal: (state: InitDataType, action: PayloadAction<Data[]>) => void;

  setNameTypeSelectForm: (
    state: InitDataType,
    action: PayloadAction<
      | "Start From Scratch"
      | "Use Template"
      | "Duplicate Existing"
      | "Import Form"
    >
  ) => void;

  setInputNameFormStore: (
    state: InitDataType,
    action: PayloadAction<string>
  ) => void;

  setInputFile: (state: InitDataType, action: PayloadAction<string>) => void;

  setInputSearchForm: (
    state: InitDataType,
    action: PayloadAction<string>
  ) => void;
};
