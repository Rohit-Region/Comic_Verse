import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const HomieDetails = createAsyncThunk(
    'comic/HomeDetails',
    async (thunkAPI)=>{
       try{ 
        const response = await axios.get(`http://localhost:3002/api/comics/comics`)
        //console.log("response",response);
        return response.data;
        }catch(e){
            console.error("Error Fetching Comic Data : ",e);
            return thunkAPI.rejectWithValue('Failed to Fetch')
        }
    }
)

const HomeSlice = createSlice({
    name:'Homebooks',
    initialState:{
        HomeData:null,
        image:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(HomieDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(HomieDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.HomeData=action.payload;
            // state.image=action.payload.image.filename;
            state.image = action.payload[0]?.image?.filename;
        })
        .addCase(HomieDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})
export const {addCase} = HomeSlice.actions;
export default HomeSlice.reducer; 