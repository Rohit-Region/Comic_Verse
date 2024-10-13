import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
const layout = () => {
  return (
    <div>
        <Sidebar/>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default layout