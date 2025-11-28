import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import annyang from 'annyang'
const SearchPage = () => {
   const [input, setInput] = useState('');

    const [Recommendatioin, setRecommendatioin] = useState([])

    // const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
    // const recognition = new SpeechRecognition()
    // if(!recognition){
    //     // console.log()
    //     toast.error("Speech recognition not define ")
    // }


     useEffect(() => {
    if (annyang) {
      const commands = {
        '*speech': (speech) => {
          setInput(speech);
          console.log('Heard:', speech);
        }
      };

      annyang.addCommands(commands);
      annyang.setLanguage('en-US');
    }
  }, []);
    const handleSearch = async()=>{
        if (annyang) annyang.start();
        console.log(input)
    }
  return (
    <div className='h-screen  bg-zinc-300'>

        <div className='flex items-center justify-center gap-3'>
            <input type="text" className='border-2 border-black' placeholder='search with ai' />
            <button onClick={handleSearch}>
                SearchWithAi
            </button>
        </div>
    </div>
  )
}

export default SearchPage