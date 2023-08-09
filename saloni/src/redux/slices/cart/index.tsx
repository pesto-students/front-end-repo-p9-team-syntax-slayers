import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import {ServiceCardProps} from "../../../components/ServiceCard/ServiceCard";

interface CartState {
    cartList: ServiceCardProps[]
  }
  
  const initialState: CartState = {
    cartList: []
  }

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToList: (state, action: PayloadAction<ServiceCardProps>) => {
        state.cartList.push(action.payload);
      },
      removeFromList: (state, action: PayloadAction<ServiceCardProps>) => { 
        const index = state.cartList.findIndex(item => item.id === action.payload.id);
        if (index >= 0) {
          state.cartList.splice(index, 1);
        }
      },
      emptyCart: (state) => {
        state.cartList = [];
      }
    }
  });

export const {addToList,removeFromList,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;
