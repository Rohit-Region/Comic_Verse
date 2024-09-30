import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Lenis from './components/Pages/lenis/Lenis'
import  Card  from './components/Pages/card/Card'
import Header from './components/header/Header'
import Layout from './components/header/layout'
import Comic_page from './components/Pages/comic_page/comic_page'
import Voice from './components/Pages/Ai/Voice'
function App() {

  return (
    <BrowserRouter> 
    <Layout/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/lenis' element={<Lenis/>}></Route>
          <Route path='/card' element={<Card/>}></Route>
          <Route path='/comic_page' element={<Comic_page/>}></Route>
          <Route path='/voice' element={<Voice/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
