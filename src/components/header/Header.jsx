import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import './header.css'
import { logout } from '../../slice/LoginSlice.jsx';
import { useEffect } from 'react'
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn } = useSelector((state) => state.login);
  
    const handleLogout = () => {
        dispatch(logout());  // Dispatch the logout action
    };
  
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');  // Redirect to login page if not logged in
        }
    }, [isLoggedIn, navigate]);  
     return (
    <div className='main'>
        <h2 className='heading'>WORLD OF COMICS</h2>
        <div className='button2' onClick={()=>handleLogout()}>LOGOUT </div>
        {/* <div>
            <button onClick={()=>Navigate('/')}>Home</button>
            <button onClick={()=>Navigate('/about')}>ABOUT</button>
        </div> */}
    </div>
  )
}

export default Header