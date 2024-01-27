import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from './../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularPlayingMovies from '../hooks/usePopularPlayingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  useNowPlayingMovies();
  usePopularPlayingMovies();
  
  return (
    <div>
      <Header/>
      {showGptSearch ? (<GptSearch/>):
      (<>
   <MainContainer/>
      <SecondaryContainer/>
      
     
      </>)
     }
      
     
    </div>
  )
}

export default Browse;
