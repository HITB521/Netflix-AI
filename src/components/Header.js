import React from 'react'
import { LOGO, USER_AVATAR } from '../utils/constants'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';


const Header = () => {
  const navigate = useNavigate();
  const user= useSelector(store=>store.user);
  
  const handleSignOut=()=>{
    signOut(auth).then(() => {
     navigate("/");
    }).catch((error) => {
      navigate("/error");
    });

  };
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={LOGO} />
       {user && <div className='flex p-2' >
        <img className="w-12 h-12 "src={USER_AVATAR} alt ="">
        </img>
        <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
      </div>}
    </div>
  
  )
}

export default Header
