import React, { useEffect } from 'react'
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user= useSelector(store=>store.user);
  const showGptSearch =useSelector((store)=>store.gpt.showGptSearch);
  
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
  const handleGptSearch=()=>{
    dispatch(toggleGptSearchView());

  }
  const handleLanguageChange=(e)=>{
    
    dispatch(changeLanguage(e.target.value));

  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      {/* commit */}
      <img className='w-44' src={LOGO} />
       {user && <div className='flex p-2' >
        {showGptSearch && (<select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang)=>
          <option key={lang.identifier}value={lang.identifier}>{lang.name}</option>
          )}
          
          
        </select>)}
        <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg ' onClick={handleGptSearch}> {showGptSearch? "Home":"AI search"}</button>
        <img className="w-12 h-12 "src={USER_AVATAR} alt ="">
        </img>
        <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
      </div>}
    </div>
  
  )
}

export default Header
