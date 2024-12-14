import { createSlice } from "@reduxjs/toolkit";

interface userType {
    username:string,
    token:string
}

interface initType {
    isAuthenticated:boolean,
    userDetails:userType | null
}


const initialState:initType = {
    isAuthenticated:false,
    userDetails:null
}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.userDetails = action.payload;
        },
        logout:(state) => {
            state.isAuthenticated=false;
            state.userDetails = null;
        }
    }
})

export const { login,logout } = userSlice.actions;
export default userSlice.reducer;