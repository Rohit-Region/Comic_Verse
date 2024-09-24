import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './card/Card.jsx'

function Home() {
 
    const navigate=useNavigate()

  return (
    <div>
        <h2>Home</h2>
        <Card/>
        {/* <button onClick={()=>navigate('/about')}>ABOUT</button>   
        <button onClick={()=>navigate('/lenis')}>LENIS</button>      */}
    </div>

  )
}

export default Home