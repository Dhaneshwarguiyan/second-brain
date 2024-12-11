import { createSlice } from "@reduxjs/toolkit";

interface formType {
    title:string,
    description:string,
    link:string
}

const initialState:formType = {
    title: "",
    description: "",
    link: "",
}

const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setForm:(state,action)=>{
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.link = action.payload.link;
        },
        clearForm:(state)=>{
            state.title = "";
            state.description = "";
            state.link = "";
        }
    }
})

export const {setForm,clearForm} = formSlice.actions;
export default formSlice.reducer;