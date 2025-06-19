import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const BannerHome = () => {
    const bannerData = useSelector(state => state.movieoData.bannerData);
    const imageURL = useSelector(state => state.movieoData.imageURL); 
    const [currentImage,setCurrentImage] = useState(1);

   
    
const handleNext =()=>{
    if(currentImage < bannerData.length -1){
        setCurrentImage(preve=>preve + 1)
    }
}
const handlePrevious =()=>{
    if(currentImage > 0){
        setCurrentImage(preve=>preve - 1)
    }
    
}
useEffect(() => {
    const interval= setInterval(()=>{
        if(currentImage < bannerData.length -1){
            handleNext()
        }else{
            setCurrentImage(0)
        }
    },5000)
    return()=>clearInterval(interval)
},[bannerData,imageURL,currentImage])


    return (
       <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, index) => {
                        return (
                            <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <div className='w-full h-full'>
                                    <img
                                        src={imageURL + data.backdrop_path}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                {/***button next and previous image */}
                                <div className='absolute left-0 z-10 justify-between hidden w-full px-4 tems-center top-1/2 group-hover:lg:flex lg:flex'>
                                    <button onClick={handlePrevious}className='z-10 p-1 text-xl text-black bg-white rounded-full'>
                                        <FaAngleLeft/>
                                    </button>

                                    <button onClick={handleNext}className='z-10 p-1 text-xl text-black bg-white rounded-full'>
                                    <FaAngleRight/>
                                    </button>
                                    </div>
                                
                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>
                                <div classname='container mx-auto'>
                                   <div className='absolute bottom-0 w-full max-w-md px-3'>
                                       <h2 className='text-2xl font-bold text-white lg:text-4xl drop-shadow-2xl'>
                                        {data.title || data.name || data.original_title || 'Untitled'}
                                       </h2>
                                       <p className='my-2 text-ellipsis line-clamp-3'>{data.overview}</p>
                                     <div className='flex items-center gap-4'>
                                       <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                                       <span>|</span>
                                        <p>View : {data.popularity ? Number(data.popularity).toFixed(0) : 'N/A'}</p>
                                     </div>
                                      
                                      <Link to={"/"+data?.media_type+"/"+data.id}>
                                      <button  className='px-6 py-3 mt-4 font-bold text-white transition-transform transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-orange-500 hover:scale-105 hover:from-orange-500 hover:to-red-600'>
                                        Play Now
                                      </button>
                                      </Link>
                                      
                                    </div>
                                </div>

                               
                            </div>
                        );
                    })
                }
            </div>
            </section>
    );
}

export default BannerHome;