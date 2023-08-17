import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import {ServiceCardProps} from "../../../components/ServiceCard/ServiceCard";

interface CartState {
    cartList: ServiceCardProps[]
    salonId?:string
  }
  
  const initialState: CartState = {
    cartList: [],
    salonId:''
  }

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToList: (state, action: PayloadAction<ServiceCardProps>) => {
        state.cartList.push(action.payload);
        state.salonId=action.payload.salon_id
      },
      removeFromList: (state, action: PayloadAction<ServiceCardProps>) => { 
        const index = state.cartList.findIndex(item => item.id === action.payload.id);
        if (index >= 0) {
          state.cartList.splice(index, 1);
        }
      },
      emptyCart: (state) => {
        state.cartList = [];
        state.salonId=''
      }
    }
  });

export const {addToList,removeFromList,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;
