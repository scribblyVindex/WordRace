import WordContext from "./WordContext";
import React, {useState} from 'react';



const WordState = (props) => {
    const [stack, setStack] = useState(1);
    const [words, setWords] = useState([]);
    const [alert, setAlert] = useState('');
    const [level, setLevel] = useState(1);
    const [text, setText] = useState("");
    const [mul, setMul] = useState(0)
    
    
    const [recent, setRecent] = useState();
    const randomWords = require('random-words');

    const restart = ()=>{
      setText('');setMul(0); setStack(0); getNewWords('restart'); 
         setLevel(1)
    }

    const getNewWords = async(restart)=>{
        // const response = await fetch(`https://random-word-api.herokuapp.com/word?number=6`,{
            
        // method: 'GET'
        // })

        const data = randomWords(6).map(i=>i.toUpperCase())
        // (await response.json()).map(i=>i.toUpperCase())

        if(restart!=='restart'){setWords(words.concat(data))}
        else{setWords(data)}
       
        
    }
    

    const updateScore = async()=>{
      
        
        const response = await fetch(`http://localhost:5000/update`,{
            
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({score:10*mul*(mul+1)/2, level:level})
        })
        const data = await response.json()
        
        Object.entries(data.data).map(i=> {
          localStorage.setItem(`${i[0]}`,i[1]);
          
        })
         
    }
    const getScores = async()=>{
        
        const response = await fetch(`http://localhost:5000/getScores`,{
            
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          }
        })
        response.json().then(e=>
        {localStorage.setItem('topScores',JSON.stringify(e))})
         
    }

    const getUser = async()=>{
        
        const response = await fetch(`http://localhost:5000/getUser`,{
            
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        })
       
        response.json().then(e=>
        Object.entries(e).map(i=> {
            localStorage.setItem(`${i[0]}`,i[1]);
            
          }))
        
    }




    


  return (


   <WordContext.Provider value={{restart,stack, setStack, words, setWords, alert, setAlert, getNewWords,level, setLevel, recent, setRecent,text, setText,mul, setMul, getUser, getScores, updateScore}}>
       {props.children}
   </WordContext.Provider>
  )
}

export default WordState