import { createSlice } from "@reduxjs/toolkit";

let initialState=[];

const comic_Slice = createSlice({
    name:'Comics',
    initialState:initialState,
    reducers:{
            addComics(state,action){
            state.push(action.payload)
        }
    }
})

export const {addComics} = comic_Slice.actions;
export default comic_Slice.reducer;