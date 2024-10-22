import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const authorDetails = createAsyncThunk(
    'author/authorDetails',
    async (authorID,thunkAPI)=>{
        try{
            console.log("ASKME")
            console.log("Author ID")
            const response = await axios.get(`http://localhost:3002/api/authorbooks/${authorID}`);
            console.log("Response : ",response)
            return response.data;
        }
        catch(e){
            console.error("Error fetching Author Details ...",e)
            return thunkAPI.rejectWithValue('Failed to fetch comic Data');
        }
    }
)

const authorSlice = createSlice({
    name : 'author',
    initialState:{
        authorData:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(authorDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(authorDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.authorData=action.payload;
        })
        .addCase(authorDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||"Something Went Wrong";
        })
    }
})

export const {addCase}=authorSlice.actions;
export default authorSlice.reducer;
