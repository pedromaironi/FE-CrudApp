import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import  ProductsReducer from "./reducers/productsReducer.js";
import authReducer from "./reducers/authReducer.js";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
