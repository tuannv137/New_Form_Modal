import type { PayloadAction } from "@reduxjs/toolkit";

export type ActionTypes = {
  initArrDataTemplate: (
    state: InitDataType,
    action: PayloadAction<Data[]>
  ) => void;
  changeTitle: (
    state: InitDataType,
    action: PayloadAction<{ title?: string }>
  ) => void;
};
