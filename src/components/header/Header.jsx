import React from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
const Header = () => {
    const  Navigate=useNavigate()
    return (
    <div className='main'>
        <h2>WORLD OF COMICS</h2>
        <nav>
            <li onClick={()=>Navigate('/')}>Home</li>
            <li onClick={()=>Navigate('/about')}>ABOUT</li>
        </nav>
    </div>
  )
}

export default Header