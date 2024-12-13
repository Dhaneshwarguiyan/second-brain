import { createSlice } from "@reduxjs/toolkit";

interface formType {
    title:string,
    description:string,
    link:string,
    tags:string[]
}

const initialState:formType = {
    title: "",
    description: "",
    link: "",
    tags:[]
}

const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setForm:(state,action)=>{
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.link = action.payload.link;
            state.tags = action.payload.tags;
        },
        clearForm:(state)=>{
            state.title = "";
            state.description = "";
            state.link = "";
            state.tags = [];
        }
    }
})

export const {setForm,clearForm} = formSlice.actions;
export default formSlice.reducer;