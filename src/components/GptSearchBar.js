import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import openai from '../utils/openAi';

const GptSearchBar = () => {
    const langKey = useSelector((store)=>store.config.lang);
    const searchText = useRef(null);
    const handleGptSearchClick=async()=>{
const gptQuery =" Act as a Movie Recommendation System and suggest some movies for the query"+searchText.current.value+". only give me name of five movies ,comma seperated movie  names like the example result given ahead.Example Result : Gadar, Sholay,Don,Golmaal,Koi Mil Gaya";
       const gptResults= await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo',
          });
    console.log(gptResults.choices?.[0]?.message?.content);
    };
  return (
    <div className='pt-[10%] flex justify-center'>
     <form className=' w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
    <input ref={searchText}className='p-4 m-4 col-span-9' type="text" placeholder={lang[langKey].gptsearchPlaceholder}/>
    <button onClick={handleGptSearchClick} className='py-2 px-4 bg-red-700 m-4 text-white rounded-lg col-span-3'>{lang[langKey].search}</button>
     </form>
    </div>
  )
}

export default GptSearchBar
