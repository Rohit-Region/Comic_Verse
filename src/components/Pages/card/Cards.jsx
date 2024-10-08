import React, { createContext, useState,useEffect } from 'react'
import { addComics } from '../../../slice/ComicSlice'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { HomieDetails } from '../../../slice/HomeSlice'
import Card from './Card'
const Cards = () => {
    const dispatch = useDispatch()
    const [data,setData]=useState(1)
    const {HomeData,image,loading,error}=useSelector((state)=>state.home)
    useEffect(() => {
        dispatch(HomieDetails());
      }, [dispatch]);
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      if (!HomeData) {
        return <div>No comic data available.</div>;
      }
 
      console.log("DATA value",HomeData);
      
    //   const comics = useSelector((item)=>item.comics[0])
 
    // console.log("Comcis world ",comics)

    // comics.map((i)=>{
    //     console.log("i value",i.name)
    // })

    return (
    <div>   
        <h2>Multiple Cards</h2>
      {HomeData && HomeData.length > 0 ? (
        HomeData.map((comic, index) => (
          <p key={index}>{comic.comic_name}</p> // Adjust the key and display values based on actual data
        ))
      ) : (
        <h1>No Data</h1>
      )}
        
    </div>
  )
}

export default Cards