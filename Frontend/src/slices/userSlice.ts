import { createSlice } from "@reduxjs/toolkit";

interface initType {
    isAuthenticated:boolean,
    token:string | null
}


const initialState:initType = {
    isAuthenticated:false,
    token:null
}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.token = action.payload;
        },
        logout:(state) => {
            state.isAuthenticated=false;
            state.token = null;
        }
    }
})

export const { login,logout } = userSlice.actions;
export default userSlice.reducer;