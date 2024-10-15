// src/features/comics/comicsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3002'; // Change to your backend API URL

// Thunks for API calls

// Fetch comic details
export const comicDetails = createAsyncThunk('comics/getBook', async (comicId) => {
  const response = await axios.get(`${BASE_URL}/api/getBook/${comicId}`);
  return response.data;
});

// Like a comic
export const likeComic = createAsyncThunk('comics/likeComic', async (comicId) => {
  const response = await axios.post(`${BASE_URL}/api/likes/${comicId}`);
  return response.data;
});

// Add a comment to a comic
export const addComment = createAsyncThunk('comics/addComment', async ({ comicId, userId, name, comment }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/comments/${comicId}`, {
            userId,
            name,
            comment
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error.response ? error.response.data : error.message);
        throw error; // Rethrow error to be caught by your slice's extraReducers
    }
    
});


// Purchase a comic
export const purchaseComic = createAsyncThunk('comics/purchaseComic', async (comicId) => {
  const response = await axios.post(`${BASE_URL}/api/purchase/${comicId}`);
  return response.data;
});

// Optional: Batch update (e.g., update likes and comments at once)
export const batchUpdate = createAsyncThunk('comics/batchUpdate', async ({ comicId, updateData }) => {
  const response = await axios.post(`${BASE_URL}/comics/${comicId}/update`, updateData);
  return response.data;
});

// Initial state
const initialState = {
  comic: null,
  loadings: false,
  errors: null,
};

// Comics slice
const comicsSlice = createSlice({
  name: 'comics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch comic details
    builder.addCase(comicDetails.pending, (state) => {
      state.loadings = true;
    });
    builder.addCase(comicDetails.fulfilled, (state, action) => {
      state.loadings = false;
      state.comic = action.payload.comic;
    });
    builder.addCase(comicDetails.rejected, (state, action) => {
      state.loadings = false;
      state.errors = action.error.message;
    });

    // Like comic
    builder.addCase(likeComic.fulfilled, (state, action) => {
      state.comic = { ...state.comic, ...action.payload.comic };
    });

    // Add comment
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comic = { ...state.comic, ...action.payload.comic };
    });
    builder.addCase(addComment.rejected, (state, action) => {
        // Handle error
        state.comic = action.error.message;
    });

    // Purchase comic
    builder.addCase(purchaseComic.fulfilled, (state, action) => {
      state.comic = { ...state.comic, ...action.payload.comic };
    });

    // Batch update
    builder.addCase(batchUpdate.fulfilled, (state, action) => {
      state.comic = { ...state.comic, ...action.payload.comic };
    });
  },
});

// Export the reducer to use in store configuration
export const {addCase}=comicsSlice.actions;
export default comicsSlice.reducer;
