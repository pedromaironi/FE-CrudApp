import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { ProductsReducer } from "./reducers/productsReducer";

const store = configureStore({
  reducer: {
    productsReducer: ProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
