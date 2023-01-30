import { configureStore } from "@reduxjs/toolkit";
import newFormModalReducer from "./ReduxStoreModal";
import mainReducer from "./ReduxStore";

export const initStore = () => {
  return configureStore({
    reducer: { new_form_modal: newFormModalReducer, ui_select: mainReducer },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
