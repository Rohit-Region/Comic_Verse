import {configureStore} from '@reduxjs/toolkit'
import ComicReducer from './slice/ComicSlice'
import booksReducer from './slice/booksSlice'
import HomeSlice from './slice/HomeSlice'
export const store = configureStore({
    devTools:true,
    reducer:{
         comics:ComicReducer,
        books:booksReducer,
        home:HomeSlice,
    }
})