import React, {useContext, useState, useEffect,useRef} from 'react'
import WordContext from '../context/WordContext'
import Alerts from './Alerts';
import Stack from './Stack';
import correct from '../sounds/correct.mp3'
import wrong from '../sounds/wrong.mp3'
import '../App.css';
import Navbar from './Navbar';

const WordRace = () => {
const context = useContext(WordContext);

const { words, setWords, stack, setStack, getNewWords, level, setLevel, setRecent, recent,mul, setMul,text, setText, page}=context;

const [word, setWord] = useState('')

const [press, setPress] = useState('')
const focusRef = useRef(null)

const [high, setHigh] = useState(parseInt(localStorage.getItem('highScore')))
const [avg, setAvg] = useState(parseInt(localStorage.getItem('avgScore')))
const [max, setMax] = useState(parseInt(localStorage.getItem('maxLevel')))
const [games, setGames] = useState(parseInt(localStorage.getItem('gamesPlayed')))

window.addEventListener("storage",(e) => {
  setHigh(localStorage.getItem('gamesPlayed'))
});

const handleSubmit= (e)=>{
   
    if(words[0]===word.toUpperCase()){
        setWords(words.filter(i=>i!==word.toUpperCase()))
        setWord('')
        setMul(mul+1)
        stack>1&&setStack(stack-1)
        audioCorrect.play()
        
    }
    else{
        audioWrong.play()
    }
    setWord('')
}
const audioCorrect = document.getElementsByClassName("correct")[0]
const audioWrong = document.getElementsByClassName("wrong")[0]
useEffect(() => {
  
  focusRef.current.focus();
  if(words.length<5){getNewWords();}

  clearTimeout(recent)

    if(stack<7&stack>0){
      setRecent(setTimeout(e=>{setStack(stack+1)}, 
    (level===1?5000:
      level===2?4000:
      level===3?3000:
      level===4&&2000)
    ));
  }
  else if(stack<7&stack<=0){
    setRecent(setTimeout(e=>{setStack(stack+1)},1000));
  }
  else{
    setRecent(setTimeout(e=>setText("gameOver")),2000);
    
    setAvg(parseInt((avg+ 10*mul*(mul+1)/2)/(games+1)));
    setGames(games+1);
    10*mul*(mul+1)/2>high&&setHigh(10*mul*(mul+1)/2);
    level>max&&setMax(level)
    
  }
  
  level<3&&setLevel(parseInt(1+mul/3))

}, [words, stack, page])

  return (
    <div className={` relative p-2 pt-16 h-screen justify-items-center border-2 gap-x-3 w-screen  grid grid-cols-3 `}>
      <Navbar/>
      {localStorage.getItem('topScores')!==null&&<div className='mt-2 col-span-1 w-full col-start-1 justify-items-center  '>
     
      <p className=' text-center mb-2 py-2 border-black w-full sm:text-lg lg:text-2xl font-semibold rounded-sm text-white bg-blue-700 '>Leaderboard</p>
      <div  className=' border-black  w-full row-span-3 col-span-2 row-start-2 grid grid-cols-2  text-black  rounded-md  '>
        {JSON.parse(localStorage.getItem('topScores')).map(i=><>
          <p className='border-blue-500 mb-2 py-2 shadow-md shadow-gray-300 border-r-2 sm:text-lg lg:text-2xl text-blue-900 bg-white rounded-sm font-semibold border-t-0 col-span-1 text-center col-start-1'>{i.username}</p>
        <p className='  border-blue-700 mb-2 py-2 shadow-md shadow-gray-300  sm:text-lg lg:text-2xl text-blue-900 bg-white rounded-sm font-semibold border-t-0 col-span-1 text-center col-start-2'>{i.highScore}</p></>)}
        </div>
      </div>}
        
        <div className='col-span-1 col-start-2 justify-items-center grid grid-rows-4'>
        <input ref={focusRef} disabled={text!==''&&true} className='w-3/4 text-blue-700 text-5xl text-center font-semibold bg-transparent ring-transparent border-b mb-12 border-blue-700  focus:outline-none col-start-1 col-span-1 row-span-1 row-start-4 '
         onKeyPress={e=>{e.key==='Enter'?handleSubmit(): setPress(e.key.toUpperCase())}}
         value={word}
         onChange={e=>{setWord(e.target.value)}}
         placeholder='enter word'/>

        <Stack stack={[].concat(words.slice(0,stack))} /></div>

        <audio className="correct" src={correct}/>
        <audio className="wrong" src={wrong}/>
        
           
        {text!==''&&<Alerts  score={10*mul*(mul+1)/2} text={text!==''&&text} />}
        
        <div className='mt-2 col-span-1 col-start-3  h-full   grid grid-rows-3 border-black w-full '>
          <div className='row-span-1 row-start-1 grid grid-cols-2  border-black w-full '>
          {press!==''&&<div className='w-full shadow-md shadow-gray-400 fade-in  bg-white rounded-lg  grid content-center  text-center col-span-1 col-start-1 h-full font-medium text-7xl text-blue-700'>{press}</div>}
          <div className='w-full fade-in   rounded-lg  grid content-center  text-center col-span-1 col-start-2 h-full font-medium  '>
            <p className='w-full mb-1 text-blue-900 text-xl h-1/4'>SCORE</p>
            <p className='w-full mb-2 text-blue-600 text-7xl h-auto'>{10*mul*(mul+1)/2}</p>
            <p className='w-full mt-4 text-blue-900 text-lg h-auto'>{'LEVEL: '+level}</p>
          </div>
            </div>
            
          {localStorage.getItem('token')!==null&&<div className='row-span-2 self-stretch  row-start-2 grid grid-cols-2 grid-rows-4  w-full '>
          <p className='text-blue-700 row-span-1 row-start-1 text-2xl self-center font-semibold text-center col-span-2  w-full  '>Your Statistics</p>
          <div style={{  backgroundColor:"#2D31FA"}} className='h-full   w-full row-span-3 col-span-2 row-start-2 grid grid-cols-2 grid-rows-2 text-white bg-blue-700 rounded-md  p-2'>
            <p className='w-full pt-8 text-center   self-stretch col-span-1 col-start-1 row-span-1 row-start-1 text-6xl shadow-md shadow-gray-700'>{high}</p>
            <p className=' text-center self-end col-span-1 col-start-1 row-span-1 row-start-1 text-lg  '>is your best score</p>
            <p className=' w-full  text-center pt-8  self-stretch col-span-1 col-start-2 row-span-1 row-start-1 text-6xl  shadow-md shadow-gray-700'>{max}</p>
            <p className=' text-center self-end col-span-1 col-start-2 row-span-1 row-start-1 text-lg  '>is your highest level</p>
            <p className='w-full  text-center pt-8  self-stretch col-span-1 col-start-1 row-span-1 row-start-2 text-6xl  shadow-md shadow-gray-700'>{avg}</p>
            <p className=' text-center self-end col-span-1 col-start-1 row-span-1 row-start-2 text-lg  '>is your average score</p>
            <p className='w-full  text-center pt-8  self-stretch col-span-1 col-start-2 row-span-1 row-start-2 text-6xl  shadow-md shadow-gray-700'>{games}</p>
            <p className=' text-center self-end col-span-1 col-start-2 row-span-1 row-start-2 text-lg '>is total games played</p>
          </div>
            </div>}
           
        </div>
          {/* <button style={{display:localStorage.getItem('token')===null&&'none'}} onClick={e=>{localStorage.clear(); navigate('/')}}>LOGOUT</button> */}

    </div>
  )
}

export default WordRace