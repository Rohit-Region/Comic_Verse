import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import Profile from "../components/Pages/profile/Profile";
import { LoginDetails } from "./LoginSlice";

export const ProfileDetails = createAsyncThunk(
    'profile/user',
    async(userId,ProfileData,thunkAPI)=>{
        try{
            console.log("userId",userId)
           
            const response= await axios.patch(`http://localhost:3002/api/users/${userId.Id}`,userId.ProfileData)
            console.log("Response : ",response)
            return response.data
        }
        catch(e){
            console.error("Error Fetching Comic Data : ",e);
            return thunkAPI.rejectWithValue('Failed To Fetch')
        }
    }
)

const UserSlice = createSlice({
    name:"Profile",
    initialState:{
        UserData:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ProfileDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(ProfileDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.UserData=action.payload;

        })
        .addCase(ProfileDetails.rejected, (state, action) => { // Change this to 'rejected'
            state.loading = false;
            state.error = action.payload;
        });
    }
})
export const {addCase}=UserSlice.actions;
export default UserSlice.reducer;