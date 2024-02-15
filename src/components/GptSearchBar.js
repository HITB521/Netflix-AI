import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openAi';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const langKey = useSelector((store)=>store.config.lang);
    const searchText = useRef(null);
    const dispatch =useDispatch();
    //writing a function to fetch movie from gpt search by using tmdb api
   
    const searchMovieTMDB= async(movie)=>{
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const  json= await data.json();
      return json.results;


    };



    const handleGptSearchClick=async()=>{
const gptQuery =" Act as a Movie Recommendation System and suggest some movies for the query"+searchText.current.value+". only give me name of five movies ,comma seperated movie  names like the example result given ahead.Example Result : Gadar, Sholay,Don,Golmaal,Koi Mil Gaya";
       const gptResults= await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo',
          });
    const gptMovies=gptResults.choices?.[0]?.message?.content?.split(",");
   
    const promiseArray = gptMovies.map((movie)=>searchMovieTMDB(movie));
    // array of promises 
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
   dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));


  
   

    };
  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
     <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
    <input ref={searchText}className='p-4 m-4 col-span-9' type="text" placeholder={lang[langKey].gptsearchPlaceholder}/>
    <button onClick={handleGptSearchClick} className='py-2 px-4 bg-red-700 m-4 text-white rounded-lg col-span-3'>{lang[langKey].search}</button>
     </form>
    </div>
  )
}

export default GptSearchBar
