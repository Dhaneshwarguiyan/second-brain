import { createSlice } from "@reduxjs/toolkit";

interface idType {
    id:string,
}

const initialState:idType = {
    id:""
}

const idSlice = createSlice({
    name:'contentId',
    initialState,
    reducers:{
        setId:(state,action)=>{
            state.id = action.payload.id;
        },
    }
})

export const {setId} = idSlice.actions;
export default idSlice.reducer;