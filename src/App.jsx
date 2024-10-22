import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Home from './components/Pages/Home'
import Author from './components/Pages/Author'
import Lenis from './components/Pages/lenis/Lenis'
import  Card  from './components/Pages/card/Card'
import Header from './components/header/Header'
import Layout from './components/header/layout'
import ComicPage from './components/Pages/comic_page/ComicPage'
import Voice from './components/Pages/Ai/Voice'
import CreateComic from './components/Pages/Create_Comic/Create_comic'
import { useDispatch,useSelector } from 'react-redux'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import Profile from './components/Pages/profile/Profile'
import Comic_Create from './components/Pages/Create_Author_Comic/Comic_Create'

function App() {
  const dispatch=useDispatch()
  const { LoginData,isLoggedIn,loading ,error  } = useSelector((state) => state.login);

  useEffect(()=>{
    setIsloggedIn(isLoggedIn)
  },[LoginData])
  useEffect(() => {
    const storedData = localStorage.getItem('LoginData');
    if (storedData) {
        setIsloggedIn(true); // User is logged in
    } else {
        setIsloggedIn(false); // User is not logged in
    }
}, []);
const [isloggedIn,setIsloggedIn]= useState(false);


  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!isloggedIn && (
          <Route>
          <Route path='/' element={<Login />} />
          <Route path='/SignUp' element={<SignUp/>}/>
          </Route>
        )}

        {/* Protected Routes */}
        {isloggedIn && (
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/author' element={<Author />} />
            <Route path='/lenis' element={<Lenis />} />
            <Route path='/card' element={<Card />} />
            <Route path='/comic_page/:comicId' element={<ComicPage />} />
            <Route path='/voice' element={<Voice />} />
            <Route path='/create_comic' element={<CreateComic />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/comic_path' element={<Comic_Create/>}/>
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
