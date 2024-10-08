import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const fetchComicDetails = createAsyncThunk(
    'comic/fetchComicDetails',
    async (comicId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3002/api/comics/comics/${comicId}`);
        console.log("API Response:", response.data); // Log the full API response
        return response.data;  // Return the response data (comic details)
      } catch (error) {
        console.error("Error fetching comic data:", error); // Log the error
        return thunkAPI.rejectWithValue('Failed to fetch comic data');
      }
    }
  );
  
const booksSlice = createSlice({
    name:'books',
    initialState:{
        bookData:null,
        image:null,
        pdf:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchComicDetails.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchComicDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.bookData=action.payload;
            state.image=action.payload.image.filename;
             state.pdf=action.payload.pdf.filename ;
        })
        .addCase(fetchComicDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || "Something Went Wrong " ;
        })
    }   
})

export const {addCase}=booksSlice.actions;
export default booksSlice.reducer;