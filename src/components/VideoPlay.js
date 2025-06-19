import React from 'react'
import { IoClose } from 'react-icons/io5'
import useFetchDetails from '../hooks/useFetchDetails'


const VideoPlay = ({data, close,media_type}) => {
    const{data : videoData} = useFetchDetails(`/${media_type}/${data?.id}/videos`)

  
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-opacity-50 bg-neutral-700'>
        <div className='relative w-full max-h-[80vh] max-w-screen-lg bg-black rounded aspect-video'>

           <button onClick={close} className='absolute z-50 text-3xl -right-1 -top-6'>
           <IoClose/>
           </button>

           <iframe
            src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
             className='w-full h-full'
            />
          
           
        </div>
       
        </section>
  )
}

export default VideoPlay