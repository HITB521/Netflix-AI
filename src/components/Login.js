import React, { useRef, useState } from 'react'
import Header from './Header';
import { BG_URL, USER_AVATAR } from '../utils/constants';
import { checkValidData } from './../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = ()=>{
    const [isSigninForm,setSigninForm]=useState(true);
    const [errorMessage,seterrorMessage]=useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email =useRef(null);
    const name=useRef(null);
    
    const password =useRef(null);// taking input using use ref 
    const toggleForm = ()=>{
        setSigninForm(!isSigninForm);
    }
    const handleButtonClick =()=>{
       
   const message = checkValidData(email.current.value,password.current.value);
   seterrorMessage(message);
   if(message)return;

   if(!isSigninForm){
    
    
    createUserWithEmailAndPassword(auth,
      email.current.value,
      password.current.value)//firebase authentication
  .then((userCredential) => {
    
  
    const user = userCredential.user;
    
    updateProfile(user, {
      displayName: name.current.value,
      
       photoURL: USER_AVATAR,
    }).then(() => {
      const { uid,email,displayName,photoUrl} = auth.currentUser;
      dispatch(addUser({
        uid:uid,email:email,displayName:displayName,photoUrl:photoUrl,
      }));
      
      navigate("/browse");
      
    }).catch((error) => {
      
      seterrorMessage(error.message);
    
    });
    
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode,errorMessage);
  
    
  });
 
    }
    
    else{
        
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    
    navigate("/browse");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorMessage);
  });
      }
    };
    return(
    <div>
    <Header/>
    <div>
    <img className="absolute"src={BG_URL} alt="bg"/>
    </div>
   <form onSubmit={(e)=>e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto  right-0 left-0 text-white rounded-lg bg-opacity-80'>
    <h1 className='font-bold text-3xl py-4 text-white'>{isSigninForm?"Sign in":"Sign up"}</h1>
   { !isSigninForm && 
   (<input ref={name}type='text' placeholder='Name ' className='p-2 my-2 w-full bg-gray-700'/>)}

    <input ref={email}type='text' placeholder='Email Address ' className='p-2 my-2 w-full bg-gray-700'/>
    <input ref={password} type='password' placeholder='Password ' className='p-2 my-2 w-full  bg-gray-700'/>
    <p className='text-red-500 font-bold py-2'>{errorMessage}</p>
    <button onClick={handleButtonClick}className='p-4 my-4 cursor-pointer bg-red-700 w-full'>{isSigninForm?"Sign in":"Sign up"} </button>
    <p onClick={toggleForm} className='py-6 cursor-pointer'>{isSigninForm?"New to Netflix? Sign Up Now":"Sign in Now "}</p>
   </form>
    </div>);

};
export default Login;



