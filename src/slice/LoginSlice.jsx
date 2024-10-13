import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const LoginDetails = createAsyncThunk(
    'user/Login',
    async(loginData,thunkAPI)=>{
        try{
            const response = await axios.post(`http://localhost:3002/api/login`,loginData)
            // console.log("response",response);
            return response.data;
        }
        catch(e){
            console.error("Error Fetching Comic Data : ",e);
            return thunkAPI.rejectWithValue('Failed To Fetch')
        }
    }
)

const LoginSlice = createSlice({
    name:"UserBook",
    initialState:{
        LoginData: JSON.parse(localStorage.getItem('LoginData')) || null,
        isLoggedIn: !!localStorage.getItem('LoginData'),//if data is not there it will be false
        loading:false,
        error:null,
    },
    reducers: {
        logout: (state) => {
            state.LoginData = null;  // Reset the LoginData
            state.isLoggedIn = false; // Update isLoggedIn to false
            state.error = null;       // Clear any error messages
            state.loading = false;     // Reset loading state
            localStorage.removeItem("LoginData");
        },
      },
    extraReducers:(builder)=>{
        builder
        .addCase(LoginDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(LoginDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.LoginData=action.payload;
            localStorage.setItem('LoginData', JSON.stringify(action.payload));
        })
        .addCase(LoginDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export const {addCase,logout} = LoginSlice.actions;
export default LoginSlice.reducer;