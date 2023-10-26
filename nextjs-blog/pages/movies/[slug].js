import Head from 'next/head';
import { PlayIcon, GlobeAltIcon, ClockIcon, InformationCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Movies() {
  const [movie, setMovie] = useState([])
  const [showings, setShowings] = useState([])
  const router = useRouter()
  
  const idMatch = router.asPath.match(/\/movies\/(\d+)/);
  const id = idMatch ? idMatch[1] : null;

  useEffect(()=>{
    axios
      .get(process.env.API_URL + '/cinemas/movies/'+ id, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: function (status) {
          return status >= 200 && status <= 302;
        },
      })
      .then(function(response){
        setMovie(response.data)
        console.log(movie)
      })
    axios
      .get(process.env.API_URL + '/showings/get-by-movie-id/'+ id,{
        headers: { 'Content-Type': 'application/json' },
          validateStatus: function (status) {
            return status >= 200 && status <= 302;
          },
      })
      .then(function(response){
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
  const formattedShowings = response.data.map((showingData) => {
  const showDate = new Date(showingData.time);
  const dayOptions = { day: "2-digit", month: "2-digit" };
  let dateText;

  if (showDate.toDateString() === today.toDateString()) {
    dateText = "Today " + showDate.toLocaleDateString("en-GB", dayOptions);
  } else if (showDate.toDateString() === tomorrow.toDateString()) {
    dateText = "Tomorrow " + showDate.toLocaleDateString("en-GB", dayOptions);
  } else {
    dateText = showDate.toLocaleDateString("en-GB", { weekday: "long" }) + " " + showDate.toLocaleDateString("en-GB", dayOptions);
  }

  return {
    id: showingData.id,
    date: dateText,
    time: showDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    extras: showingData.showingExtras,
  };
});
formattedShowings.sort((a, b) => {
  const dateA = new Date(a.time);
  const dateB = new Date(b.time);
  if (dateA > dateB) return 1;
  if (dateA < dateB) return -1;
  return 0;
});
formattedShowings.reverse();

setShowings(formattedShowings);
      })
  }, [])

  const uniqueDates = [...new Set(showings.map(showing => showing.date))];
    return (
      <>
        <Head>
        <title>{movie.title} - DHBW Kino</title>
        <meta
          name="description"
          content={`Check out ${movie.title}, a movie released in ${movie.releaseYear}.`}
        />
      </Head>
        <main className='bg-primary-20 mt-5'>
          <div className='flex 2xl:flex-row flex-col max-w-7xl'>
              <img src={movie.imageSrc} alt="" className=" h-[15rem] 2xl:h-[55rem] w-full object-cover"/>
            <div className='flex flex-col px-5 mt-10 flex-nowrap w-full overflow-x-scroll no-scrollbar'>
              <h1 className='text-white text-6xl font-semibold'>{movie.title}</h1>
             
              <div className='flex flex-row flex-wrap mt-4 gap-x-2 gap-y-2 text-neutral-100'>
                <div className='flex flex-row items-center bg-primary-30 px-2 py-1 rounded-2xl '>
                  <PlayIcon className='h-5 w-5'/>
                  <div className='text-sm ml-1'>{movie.runningWeek}. Week</div>
                </div>
                <div className='flex flex-row items-center bg-primary-30 px-2 py-1 rounded-2xl'>
                  <GlobeAltIcon className='h-5 w-5'/>
                  <div className='text-sm ml-1'>{movie.releaseCountry}, {movie.releaseYear}</div>
                </div>
                <div className='flex flex-row items-center bg-primary-30 px-2 py-1 rounded-2xl'>
                  <ClockIcon className='h-5 w-5'/>
                  <div className='text-sm ml-1'>{movie.runtime}'</div>
                </div>
                <div className='flex flex-row items-center bg-primary-30 px-2 py-1 rounded-2xl'>
                  <InformationCircleIcon className='h-5 w-5'/>
                  <div className='text-sm ml-1'>{movie.fsk}</div>
                </div>
                <div className='flex flex-row items-center bg-primary-30 px-2 py-1 rounded-2xl'>
                  <TagIcon className='h-5 w-5'/>
                  <div className='text-sm ml-1'>{movie.genres}</div>
                </div>
              </div>
              <ul className='text-neutral-200 mt-3 ml-2 text-sm'>
                <li> <b>Director</b>: {movie.director}</li>
                <li><b>With:</b> {movie.actors}</li>
              </ul>
              <p className='mt-8 text-white ml-2'>
                {movie.description}
              </p>
              <h2 className='text-white text-2xl mt-5 font-semibold ml-2'>
                Shows:
              </h2>
              <div className='flex flex-row mt-2 ml-2 gap-x-4 flex-nowrap overflow-x-scroll pb-5 scroll-smooth'>
                {uniqueDates.map((date) =>(
                    <div className='flex flex-col text-white bg-primary-30 p-4 rounded-xl' key={date}>
                      <p className='md:text-lg text-base font-semibold bg-primary-20 w-fit py-1 px-2 rounded-xl '>
                        {date}
                      </p>
                      <div className='flex flex-row mt-4 gap-x-2'>
                        {showings.filter((item) => item.date === date).map((item)=>(
                          <Link href={router.query.slug + "/show/" + item.id}>
                            <div className='flex flex-col md:gap-y-20 gap-y-10 text-center bg-accent-30 p-3 hover:bg-accent-40 rounded-md' key={item.id}>
                              <p className='md:text-4xl text-3xl'>
                                {item.time}
                              </p>
                              <p className='text-base'>
                                {item.extras}
                              </p>
                            </div>
                          </Link>
                          
                        ))}   
                      </div>
                    </div>
                    

                ))}
              </div>
              </div>
            </div>
        </main>
      </>
    )
  }