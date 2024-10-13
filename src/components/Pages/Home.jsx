import React , {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './card/Card.jsx'
import Carousel from './home/carousel.jsx'
import Voice from './Ai/Voice.jsx'
import {useDispatch,useSelector} from 'react-redux'
import { addComics } from '../../slice/ComicSlice.jsx'
import Cards from './card/Cards.jsx'
import Top10 from './card/Top10.jsx'
import { logout } from '../../slice/LoginSlice.jsx';
import MostReaded from './card/MostReaded.jsx'

function Home() {
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
    <div>
    
        <Carousel/>
        <button onClick={()=>(handleLogout())}>VLAUWANSDJJS</button>
        <Voice/>
        <Cards/>
        <Top10/>
        <MostReaded/>
        {/* <Card/> */}

        {/* <button onClick={()=>navigate('/about')}>ABOUT</button>   
        <button onClick={()=>navigate('/lenis')}>LENIS</button>      */}
    </div>

  )
}

export default Home