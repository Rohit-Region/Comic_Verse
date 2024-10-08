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
import Create_comic from './components/Pages/Create_Comic/Create_comic'
import { Provider } from 'react-redux'
import { store } from './store'
function App() {

  return (
    <Provider store={store}>
    <BrowserRouter> 
    <Layout/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/lenis' element={<Lenis/>}></Route>
          <Route path='/card' element={<Card/>}></Route>
          <Route path='/comic_page' element={<Comic_page/>}></Route>
          <Route path='/voice' element={<Voice/>}></Route>
          <Route path='/Create_comic' element={<Create_comic/>}></Route>
        </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
