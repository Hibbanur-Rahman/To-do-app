import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    user:any;
    isAuthenticated:boolean;
}

const initialState:AuthState={
    user:null,
    isAuthenticated:false,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        handleIsAuthenticated:(state,action:PayloadAction<{isAuthenticated:boolean}>)=>{
            state.isAuthenticated=action.payload.isAuthenticated;
            console.log("is AUthenticated:",state.isAuthenticated)
        },
        handleLogout:(state,action:PayloadAction<{isAuthenticated:boolean}>)=>{
            state.isAuthenticated=action.payload.isAuthenticated;
        }
    }
})

export const {handleIsAuthenticated}=authSlice.actions;
export default authSlice.reducer;