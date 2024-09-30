import React from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
const Header = () => {
    const  Navigate=useNavigate()
    return (
    <div className='main'>
        <h2>WORLD OF COMICS</h2>
        {/* <div>
            <button onClick={()=>Navigate('/')}>Home</button>
            <button onClick={()=>Navigate('/about')}>ABOUT</button>

        </div> */}
    </div>
  )
}

export default Header