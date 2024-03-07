import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";
import { userSlice } from './user-slice'
import { authSlice } from './Auth/authSlice'
import {productsSlice} from './Products/productSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch