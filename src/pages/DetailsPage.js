import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScollCard from '../components/HorizontalScollCard';
import useFetch from '../hooks/useFetch';
import VideoPlay from '../components/VideoPlay';


const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector(state => state.movieoData.imageURL); 
  const{ data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data :castData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const {data : similarData} =useFetch(`/${params?.explore}/${params?.id}/similar`) 
  const {data : recommendationData} =useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const[playVideo,setPlayVideo] = useState(false)
  const[playVideoId,setPlayVideoID] = useState("") 




  
  

  console.log("data",data)
  console.log("star cast",castData)

  const handlePlayVideo =(data)=>{
    setPlayVideoID(data)
    setPlayVideo(true)
  }
  
  const duration = (data?.runtime/60)?.toFixed(1).split(".")
  const writer = castData?.crew?.filter(el => el.job === "Writer")?.map(el => el?.name)?.join(", ")



  return (
    <div>
        <div className='w-full h-[280px] relative hidden lg:block'>
          <div className='w-full h-full'>
              <img
                src={imageURL+data?.backdrop_path}
                className='object-cover w-full h-full'
              />
          </div>
               <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900/90 to-transparent'>
               </div>
        </div>

        
        <div className='container flex flex-col gap-5 px-3 py-16 mx-auto lg:flex-row lg:py-0 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
              <img
                src={imageURL+data?.poster_path}
                className='object-cover rounded w-60 h-80'
              />
              <button onClick={()=>handlePlayVideo(data)} className='w-full px-4 py-2 mt-3 text-lg font-bold text-center text-black transition bg-white rounded hover:bg-red-500 hover:scale-105'>Play Now</button>
        </div>
               <div>
                <h2 className='text-2xl font-bold text-white lg:text-4xl'>{data?.title || data?.name}</h2>
                <p className='text-neutral-400'>{data?.tagline}</p>
                
             
       <Divider/>
        <div className='flex items-center gap-3 '>
          <p> Rating : {Number(data?.vote_average).toFixed(1)}</p>+
          <span>|</span>
          <p>View : {Number(data?.vote_count)}</p>
          <span>|</span>
          <p>Duration : {duration[0]}h {duration[1]}m</p>
        </div>
        
        <Divider/>

        <div>
          <h3 className='text-xl font-bold text-white '>Overview</h3>
          <p>{data?.overview}</p>
          <Divider/>

          <div className='flex items-center gap-3 my-3 text-center'>
            <p>Status :{data?.status}</p>
            <span>|</span>
            <p>Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
            <span>|</span>
            <p>Revenue : {Number(data?.revenue)}</p>
          
          </div>
          
          <Divider/>
          
          <div>
            <p><span className='text-white'>Director</span> : {castData?.crew[0]?.name} </p>

            <Divider/>
            <p>
              <span className='text-white'> Writer :{writer}</span>
            </p>
          </div>
          
          <Divider/>
          <h2 className='text-lg font-bold'>Cast :</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {
              castData?.cast?.filter(el=> el?.profile_path).map((startCast,index)=>{
                return(
                  <div>
                    <div>
                      <img 
                      src={imageURL +startCast?.profile_path}
                      className='object-cover w-24 h-24 rounded-full'
                      />
                    </div>
                    <p className='text-sm font-bold text-center text-neutral-400 '>{startCast?.name}</p>
                    </div>
                )
              })
            }
          </div>
          
        </div>

        </div>
        </div>

  

        <div>
        <HorizontalScollCard data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore}/>
        <HorizontalScollCard data={recommendationData} heading={"recommendation "+params?.explore} media_type={params?.explore}/>
         </div>

         {
          playVideo &&(
            <VideoPlay data={playVideoId} close={()=>setPlayVideo(false)}media_type={params?.explore} />
          )
         }

         

         
         </div>

         
         
         
         
  )
}

export default DetailsPage