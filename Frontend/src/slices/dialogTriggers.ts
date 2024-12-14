import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialog:false,
    shareDialog:false,
    isLoading:false,
    menuDrawer:false,
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
        },
        toggleMenu:(state)=>{
            state.menuDrawer = !state.menuDrawer;
        }
    }
})

export const {toggleDialog,toggleLoading,toggleShareDialog,toggleMenu} = triggerSlice.actions;
export default triggerSlice.reducer;