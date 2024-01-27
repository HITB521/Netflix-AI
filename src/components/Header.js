import React, { useEffect } from 'react'
import { LOGO, USER_AVATAR } from '../utils/constants'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user= useSelector(store=>store.user);
  
  const handleSignOut=()=>{
    signOut(auth).then(() => {
     
    }).catch((error) => {
      navigate("/error");
    });

  };
  useEffect(()=>{
   const unsubscribe=  onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const { uid,email,displayName,photoUrl} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoUrl:photoUrl}));
        navigate("/browse");  // without authentication nobody can access the browse page
        // ...
      } else {
        dispatch(removeUser());// without authentication nobody can access the browse page
        navigate("/");
      }
    });
    return () => unsubscribe();


  },[]);
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      {/* commit */}
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
