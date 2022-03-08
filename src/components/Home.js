
import {  useNavigate  } from "react-router-dom";
import React, {useContext, useEffect} from 'react'
import WordContext from '../context/WordContext'
import Navbar from "./Navbar";



const Home = () => {
    const navigate = useNavigate();
    const context = useContext(WordContext);
    const {getNewWords, getScores, restart}=context;

    useEffect(() => {
      
        restart();
        getScores();
        getNewWords();
       
       
    }, [])
    

  return (
    <div className='pt-20 mb-44 relative justify-items-center px-10 grid text-blue-300 font-medium col-span-1 '>
    <Navbar/>
    <h1 style={{  color:"#051367"}} className="text-7xl w-full text-center font-bold">WORD RACE</h1>
    <button style={{  backgroundColor:"#2D31FA"}} className=" mt-8 mb-8 w-1/4 text-3xl font-medium text-white h-1/8 py-2 rounded-md " onClick={e=>{
        navigate('/game');restart();getNewWords('restart'); getScores();
        }}>START GAME</button>
    <h1 style={{  color:"#5D8BF4"}} className="text-3xl w-full text-center font-medium ">Instructions</h1>
    <p style={{  color:"#2D31FA"}} className="w-3/4 text-white text-xl text-left">WORDRACE is a game designed to improve your accuracy and speed while typing. 
      You will have to type the 1st word at the top of the stack in the given time-frame depending upon the level(more on that later). The stack can hold only 6 words, even a single word more and it's GAME OVER! </p>
      
     <p style={{  color:"#2D31FA"}} className="w-3/4 my-4 text-white text-xl text-left"> The more correct words you type, the bigger you score and score-multiplier gets. There are four levels level-1 through level-4. At level-1 stack fills up at 1 word per 5 seconds. At level-2 stack fills up at 1 word per 4 seconds. At level-3 the pace is 1 word per 3 seconds. Finally at level-4 stack fills up at 1 word per 2 seconds.</p>
     <p style={{  color:"#2D31FA"}} className="w-3/4 text-white text-xl text-left"> The bigger the level, the faster the stack fills up so BEWARE! You can save your score by logging in if you have an account or signing up otherwise.
    </p>
    </div>
  )
}

export default (Home)