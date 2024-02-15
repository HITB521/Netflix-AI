import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptmovieSuggestions from './GptmovieSuggestions';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
    
    
        <div className='fixed -z-10'>
        <img className=" h-screen object-cover md:h-auto md:object-cover " src={BG_URL} />
        </div>
            
            

        <div className=''>
        <GptSearchBar/>
      <GptmovieSuggestions/>
        </div>
       
   
    </>
    
  );
};

export default GptSearch
