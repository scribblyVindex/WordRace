import React, {useContext} from 'react'


import {  useNavigate } from 'react-router-dom';
import WordContext from '../context/WordContext'

const Navbar = () => {
  const navigate = useNavigate()
  const context = useContext(WordContext);
  const {setStack}=context;
  return (
    <header className="rounded-b-lg absolute grid grid-cols-3 bg-white shadow-md border-gray     h-14  w-full px-5 content-center ">
      
      {/* <p style={{  color:"#2D31FA"}} className='place-self-start self-center  text-2xl font-bold'>WORD</p> */}
      <a  className=' text-blue-700 hover:text-red-500 self-center justify-self-start text-md font-normal cursor-pointer' rel="noreferrer" href="https://github.com/scribblyVindex/wordrace" target= "_blank">Source code</a>
      <button onClick={e=>navigate('/')} style={{  color:"#2D31FA"}} className=' bg-transparent col-span-1 col-start-2 justify-self-center  sm:text-lg lg:text-2xl font-bold'>WORDRACE</button>
      {/* <i className="justify-self-end self-center text-xl fas col-span-1 col-start-3  fa-sign-out-alt"></i> */}
     {localStorage.getItem('token')===null?<div className='flex justify-self-end self-center'> 
     <button  style={{  color:"#2D31FA"}} onClick={e=>{navigate('/login');setStack(0)}} className="mx-4 font-semibold  text-xl col-span-1 col-start-3  ">Login</button>
      <button  style={{  color:"#2D31FA"}} onClick={e=>{navigate('/signup');setStack(0)}} className=" font-semibold  text-xl col-span-1 col-start-3  ">Signup</button></div>:
     <button onClick={e=>{navigate('/'); localStorage.clear()}}  className="justify-self-end font-semibold self-center text-xl text-red-500 col-span-1 col-start-3  ">Logout</button>}
    </header>
  );
};

export default (Navbar);
