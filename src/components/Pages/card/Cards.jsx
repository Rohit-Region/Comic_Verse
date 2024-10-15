import React, { createContext, useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { HomieDetails } from '../../../slice/HomeSlice'
import { useNavigate } from 'react-router-dom'
import Card from './Cards'
const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data,setData]=useState(1)
    const {HomeData,image,loading,error}=useSelector((state)=>state.home)
    console.log("Home Data :",HomeData)
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
 
    const baseURL = "http://localhost:3002/";
    return (
<div>
<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <h2>RECENTLY ADDED COMICS:</h2>
  </div>
<div style={{display:'flex',flexDirection:'row',gap:'20px'}}>
 
    {HomeData && HomeData.length > 0 ? (
      HomeData.map((comic, index) => (
        <div style={{backgroundColor:'purple',borderRadius:'10px',}} key={index} onClick={() => navigate(`./comic_page/${comic.comicId}`)}>
          <div>
            <p>{comic.comicId}</p>
            <img
              src={`${baseURL}${comic.image.path}`} 
              alt={comic.originalname}
              style={{borderRadius:'10px', width: '200px', height: '200px' }} // Adjust the image size
            />
            <div>Name: {comic.comic_name}</div>
          </div>
        </div>
      ))
    ) : (
      <h1>No Data</h1>
    )}
  </div>
</div>

  )
}

export default Cards