import {configureStore} from '@reduxjs/toolkit'
import ComicReducer from './slice/ComicSlice'
import booksReducer from './slice/booksSlice'
import HomeSlice from './slice/HomeSlice'
import LoginSlice from './slice/LoginSlice'
import UserSlice from './slice/UserSlice'
import AuthorSlice from './slice/AuthorSlice'
export const store = configureStore({
    devTools:true,
    reducer:{
        login:LoginSlice,
        comics:ComicReducer,
        books:booksReducer,
        home:HomeSlice,
        user:UserSlice,
        author:AuthorSlice        
    }
})