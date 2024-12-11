import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialog:false,
    shareDialog:false,
    isLoading:false
}


const triggerSlice = createSlice({
    name:'trigger',
    initialState,
    reducers:{
        toggleDialog:(state)=>{
            state.dialog = !state.dialog;
        },
        toggleShareDialog:(state)=>{
            state.shareDialog = !state.shareDialog;
        },
        toggleLoading:(state)=>{
            state.isLoading = !state.isLoading;
        }
    }
})

export const {toggleDialog,toggleLoading,toggleShareDialog} = triggerSlice.actions;
export default triggerSlice.reducer;