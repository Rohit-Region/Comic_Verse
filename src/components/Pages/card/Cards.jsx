import React, { useState } from 'react'
import Card from './Card'

const Cards = () => {
    const [data,setData]=useState(0)
    return (
    <div>
        <h2>Multiple Cards</h2>
        {data?
        (
            <Card></Card>
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