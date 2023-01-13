import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./ReduxStore";

export const initStore = () => {
  return configureStore({
    reducer: { mainStore: mainReducer },
  });
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
