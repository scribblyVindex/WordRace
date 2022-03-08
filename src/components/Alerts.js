
import React, {useContext,useEffect} from 'react'
import {  useNavigate  } from "react-router-dom";
import '../App.css';
import victory from '../sounds/victory.mp3'

import WordContext from '../context/WordContext'

const Alerts = (props) => {

    const context = useContext(WordContext);
    const navigate = useNavigate();
    

    const {getNewWords, getScores, updateScore,  setText, text,restart}=context;
    useEffect(() => {
      if(localStorage.getItem('token') !==null & text==="gameOver"){
        updateScore();
       }
    }, [text])

   
  return (props.trigger || props.text!==''||props.text?
    <div className='p-10 fade-in-out rounded-md border-black shadow-md shadow-gray-400 absolute grid justify-items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 grid-rows-4 gap-2 bg-white'>
      <audio autoPlay={text==='gameOver'&&true} className="gameOver" src={victory}/>
       {
            
            (props.text  ==='gameOver'& localStorage.getItem('token')===null)?
            <>
            <p className='row-span-1 row-start-1 text-4xl text-blue-600 font-semibold '>GAME OVER!!</p>
            <p className='row-span-1 row-start-2 text-xl text-center text-blue-800'>Login or Signup to save your score</p>
            <div className='flex w-full   row-span-1 row-start-3'>
              <button style={{  backgroundColor:"#DFF6FF"}} className='w-1/3 mx-6 h-12 text-blue-700 text-center font-semibold px-2 pt-2 shadow-md shadow-gray-400 border-blue-700  text-2xl' onClick={e=>navigate('/login')} id="login">Login</button>
              <button style={{  backgroundColor:"#DFF6FF"}} className='w-1/3 mx-4 h-12 text-blue-700 text-center font-semibold px-2 pt-2 shadow-md border-blue-700 shadow-gray-400  text-2xl' onClick={e=>navigate('/signup')} id="login">Signup</button>
            
            </div>
            
            </>:<>
            <div className=' text-center row-span-1 row-start-1 text-2xl text-blue-600 font-semibold '>{props.text.toUpperCase() + '!'}
            </div>
            <button className=' h-12 w-3/4 mt-4 bg-blue-600 text-white py-2  mx-4   text-center font-semibold px-2 pt-2 shadow-md border-blue-700 shadow-gray-400  text-2xl ' onClick={e=>{ navigate('/');setText('')}}>Back to HomePage</button>
            <button className=' h-12 w-3/4 mt-4 bg-blue-600 text-white py-2  mx-4   text-center font-semibold px-2 pt-2 shadow-md border-blue-700 shadow-gray-400  text-2xl ' onClick={e=>{setText('')}}>Close</button>
            
            </>

            }
        <button className='row-span-1 row-start-4 h-12 mt-4 bg-blue-600 text-white py-2 w-3/4 mx-4   text-center font-semibold px-2 pt-2 shadow-md border-blue-700 shadow-gray-400  text-2xl ' onClick={()=>{navigate('/game');restart(); getNewWords('restart');getScores();
      }}>Restart Game</button>
        <p></p>
    </div>
    :''
  )
}

export default Alerts