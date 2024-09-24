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

function App() {

  return (
    <BrowserRouter> 
    <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/lenis' element={<Lenis/>}></Route>
          <Route path='/card' element={<Card/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
