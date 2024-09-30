import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './card/Card.jsx'
import Carousel from './home/carousel.jsx'
import Voice from './Ai/Voice.jsx'

function Home() {
 
    const navigate=useNavigate()

  return (
    <div>
        <h2>Home</h2>
        <Carousel/>
        <Card/>
        <Voice/>
        {/* <button onClick={()=>navigate('/about')}>ABOUT</button>   
        <button onClick={()=>navigate('/lenis')}>LENIS</button>      */}
    </div>

  )
}

export default Home