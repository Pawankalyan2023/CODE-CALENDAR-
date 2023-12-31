import React from 'react'
import Pagenation from './Pagenation'
import Carousell from '../corosoule/slider'
import Forms from './forms'

export default function Pageindex(){
  return (
    <div>
        <Carousell/>
        <h1 className="text-center font-medium text-3xl px-10 py-10" >Divide and Conquer!</h1>
        <h2 className='font-medium text-2xl pl-9 px-3 py-3'>Today's Contest</h2>
        <Forms/>
        <Forms/>
        <Forms/>
        <h2 className='font-medium text-2xl pl-9 px-3 py-3'> Contest On 1 Jan 2024</h2>
        <Forms/>
        <Forms/>
        <Forms/>
        <Pagenation/>
    </div>
  )
}

