import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import {ServiceCardProps} from "../../../components/ServiceCard/ServiceCard";
import {SalonCardProps} from "../../../components/SalonCard/SalonCard"

interface CartState {
    cartList: ServiceCardProps[]
    salonId?:string
    salon:SalonCardProps
  }
  
  const initialState: CartState = {
    cartList: [],
    salonId:'',
    salon:{salonName:'',location:'',gender:''}
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
        if(state.cartList.length=1)
        state.salonId=''
        if (index >= 0) {
          state.cartList.splice(index, 1);
        }
      },
      emptyCart: (state) => {
        state.cartList = [];
        state.salonId=''
      },
      addSalonDetails: (state,action:PayloadAction<SalonCardProps>)=>{
          state.salon.salonName=action.payload.salonName
          state.salon.location=action.payload.location
          state.salon.gender=action.payload.gender
      }
    }
  });

export const {addToList,removeFromList,emptyCart,addSalonDetails} = cartSlice.actions;

export default cartSlice.reducer;
