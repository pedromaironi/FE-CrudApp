import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer";

const store = configureStore({
  reducer: {
    ProductsReducer: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
