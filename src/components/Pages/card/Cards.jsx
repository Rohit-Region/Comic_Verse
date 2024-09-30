import React, { createContext, useState } from 'react'
import Card from './Card'
const Cards = () => {
    const [data,setData]=useState(1)
    const [datas,setDatas]=useState([
        {
            id:1,
            name:"Jinzo",
            Rating:4
    },{
        id:2,
        name:"vanavil",
        Rating:3
    }])
    return (
    <div>   
        <h2>Multiple Cards</h2>
        {data?
        (
            <Card props={datas}></Card>
        )
        :
        (
        <h1>No Data</h1>
        )
        }
        
    </div>
  )
}

export default Cards