

import React, { useState, useEffect} from 'react'

import '../App.css';

const Stack = (props) => {
    

const [o, setO] = useState(0)

    useEffect(() => {
    
    setTimeout(e=>{setO(100)},500)  
    
    }, [o])
    
  return (
    <div className='  col-span-1 col-start-1 grid content-start justify-items-center  row-start-1 row-span-3 h-full w-full'>{
        props.stack.map((i,index)=>
            index<6&&<p className='bg-blue-700 rounded-sm shadow-md shadow-gray-400  h-auto my-2 py-2 font-semibold sm:text-lg lg:text-2xl text-white mb-1 text-center w-1/2 fade-in  '>{i}</p>
    )
        }</div>
  )
}

export default Stack