import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './card/Card.jsx'
import Carousel from './home/carousel.jsx'
import Voice from './Ai/Voice.jsx'
import {useDispatch} from 'react-redux'
import { addComics } from '../../slice/ComicSlice.jsx'
import Cards from './card/Cards.jsx'
function Home() {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const [datas,setDatas]=useState([
      {
          id:1,
          name:"Jinzo",
          Rating:4
  },{
      id:2,
      name:"vanavil",
      Rating:3
  }])
  dispatch(addComics(datas))
  return (
    <div>
        <h2>Home</h2>
        <Carousel/>
        <Cards/>
        <Card/>
        <Voice/>
        {/* <button onClick={()=>navigate('/about')}>ABOUT</button>   
        <button onClick={()=>navigate('/lenis')}>LENIS</button>      */}
    </div>

  )
}

export default Home