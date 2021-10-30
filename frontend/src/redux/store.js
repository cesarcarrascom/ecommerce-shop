import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartRedux";

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
