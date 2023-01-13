import type {PayloadAction } from "@reduxjs/toolkit";

export type ActionTypes = {
    initStore: (state: InitDataType, action: PayloadAction<{title?: string}>) => void;
    changeTitle: (state: InitDataType, action: PayloadAction<{title?: string}>) => void;
};