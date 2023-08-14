import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux/slices/cart";
import  userSlice from "./slices/user";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user:userSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch