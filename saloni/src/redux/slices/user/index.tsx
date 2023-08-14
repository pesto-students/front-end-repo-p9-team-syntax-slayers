import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';


interface UserDetails {
    userId: string;
    email: string;
    firstName: string;
    userType: string;
    profilePicUrl: string;
    // Note: `isLoggedIn` and `token` are already part of `initialState` and don't need to be in this payload.
  }

const initialState={
  userId:'',
  email:'',
  firstName:'',
  userType:'',
  profilePicUrl:'',
  isLoggedIn:false,
  token:''
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setToken: (state) => {
            const tokenValue = localStorage.getItem("token");
            if (tokenValue) {
                console.log("The key 'token' exists in localStorage.");
                if (tokenValue) {
                const decodedToken:UserDetails = jwtDecode(tokenValue);
                console.log(decodedToken);
                state.token = tokenValue;
                state.isLoggedIn = true;
                state.email=decodedToken.email
                state.firstName=decodedToken.firstName
                state.userId=decodedToken.userId
                state.userType=decodedToken.userType
                state.profilePicUrl=decodedToken.profilePicUrl
                localStorage.setItem('type',decodedToken.userType)
                }
                

            } else {
                console.log("The key 'token' does not exist in localStorage.");
            }
        },
        removeToken:(state)=>{
            Object.assign(state, initialState);
           localStorage.removeItem('token')
           localStorage.removeItem('type')
        }
    }
})

export const {setToken,removeToken}=userSlice.actions

export default userSlice.reducer