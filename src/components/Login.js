import React, {useContext, useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import WordContext from '../context/WordContext'
import Alerts from './Alerts';

const Login = (props) => {
    const [creds, setCreds] = useState({username:"", password:""});
    const [toggle, setToggle] = useState("password");
    
    const navigate = useNavigate();
    const context = useContext(WordContext)
     const {updateScore,stack, text, setText}=context;


    const handleClick =async ()=>{
        
        if(creds.username!=='' || creds.password!==''){
          const response = await fetch(`http://localhost:5000/${props.type}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({username:creds.username, password:creds.password})
        })
        
        if(response.status===200){
          
          response.json().then(e=>
        {
        localStorage.setItem('token',e.authToken);
        Object.entries(e.data).map(i=> {
            localStorage.setItem(`${i[0]}`,i[1]);
            
          });
        navigate('/');
        if(stack!==0){updateScore(); console.log('submitting')}
       
        });}
        else{
          
          const data = await response.json()
            setText(data.message)
        }}
        else{
          setText('Enter both username an password')
        }

    }

    const handleChange = (e)=>{
        setCreds({ ...creds, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        setText('')
        setCreds({username:"", password:""})
    }, [])
    
  return (
    <div className='grid content-center justify-items-center w-full h-full border-2 border-black  bg-transparent'>
      <div className='grid justify-items-center  w-2/5 h-full p-6 py-10 shadow-md rounded-md shadow-blue-300 bg-white border-black'>
      <p className=' border-black mb-4 text-center text-3xl font-semibold text-blue-700 h-10'>{props.type.toUpperCase()}</p>
        <label className='text-gray-700 text-xl  w-full h-10'>Username</label>
        <input className='ring-2 ring-gray-300 p-2 rounded-sm text-xl w-full focus:ring-blue-500 focus:shadow-lg shadow-blue-500 outline-none' onChange={handleChange} id='username' />
        <label className='mt-4 text-gray-700 text-xl w-full h-10'>Password</label>
        <input type={toggle} className='ring-2 ring-gray-300 p-2 w-full rounded-sm text-xl focus:ring-blue-500 focus:shadow-lg shadow-blue-500 outline-none' onChange={handleChange} id='password' />
        <button onClick={e=>{toggle==='password'?setToggle('text'):setToggle('password')}} className='mt-0 text-gray-700 text-sm w-full h-10'>{toggle==='password'?'Show Password':'Hide Password'}</button>
        <button className='mt-4 text-3xl p-3 rounded-sm text-blue-700 border-blue-500 hover:bg-blue-500 hover:text-white transition delay-100 duration-200 ease-in-out border-2 ' onClick={handleClick} >{props.type.toUpperCase() + ' NOW!'}</button>
        {text!==''&&<Alerts text={text}/>}
        </div>
    </div>
  )
}

export default Login