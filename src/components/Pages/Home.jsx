import React , {useState,useEffect} from 'react'
import Carousel from './home/carousel.jsx'
import Voice from './Ai/Voice.jsx'
import Cards from './card/Cards.jsx'
import Top10 from './card/Top10.jsx'
import MostReaded from './card/MostReaded.jsx'
import { useDispatch,useSelector } from 'react-redux'

function Home() {
  const { LoginData,userId, name,role, phoneNumber,isLoggedIn,loading ,error  } = useSelector((state) => state.login);
  useEffect(() => {
    console.log("ASDA", LoginData, name, userId, role, phoneNumber);
  }, [LoginData, name, userId, role, phoneNumber]); 
  return (
    <div>

        <Carousel/>
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