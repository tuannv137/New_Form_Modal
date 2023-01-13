import { configureStore } from "@reduxjs/toolkit";
import newFormModalReducer from "./ReduxStore";

export const initStore = () => {
  return configureStore({
    reducer: { new_form_modal: newFormModalReducer },
  });
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
