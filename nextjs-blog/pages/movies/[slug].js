import Head from 'next/head';
import { PlayIcon, GlobeAltIcon, ClockIcon, InformationCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useRouter} from 'next/router';

const movie = {
  id: 1,
  name: 'Joker',
  imageSrc: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  fsk: 'FSK18',
  description: "A socially inept clown for hire - Arthur Fleck aspires to be a stand up comedian among his small job working dressed as a clown holding a sign for advertising. He takes care of his mother- Penny Fleck, and as he learns more about his mental illness, he learns more about his past. Dealing with all the negativity and bullying from society he heads downwards on a spiral, in turn showing how his alter ego \"Joker\", came to be.",
  releaseYear: "2019",
  genres: ["Drama", "Thriller", "Crime"],
  director: "Todd Phillips",
  runningWeek: "2",
  runtime:"122min",
  releaseCountry: "USA",
  actors: ["Joaquin Phoniex", "Robert De Niro", "Zazie Beetz"],
  showings:[
    {
      id: 1,
      date: '31.08',
      time: '12:30',
    },
    {
      id: 2,
      date: '31.08',
      time: '15:00',
    },
    {
      id: 3,
      date: '31.08',
      time: '19:00',
    },
    {
      id: 4,
      date: '31.08',
      time: '20:30',
    },
    {
      id: 5,
      date: '01.09',
      time: '13:00',
    },
    {
      id: 6,
      date: '01.09',
      time: '14:30',
    },
    {
      id: 7,
      date: '01.09',
      time: '17:30',
    },
    {
      id: 8,
      date: '01.09',
      time: '19:30',
    },
    {
      id: 9,
      date: '02.09',
      time: '14:30',
    },
    {
      id: 10,
      date: '02.09',
      time: '19:30',
    },
  ]
}
export default function Movies() {
  const router = useRouter()
  const uniqueDates = [...new Set(movie.showings.map(showing => showing.date))];
    return (
      <>
        <Head>
          <title>Kino {movie.name}</title>
        </Head>
        <main className='bg-primary-20 mt-5'>
          <div className='flex xl:flex-row flex-col max-w-7xl'>
              <img src={movie.imageSrc} alt="" className=" h-[15rem] xl:h-[55rem] w-full object-cover"/>
            <div className='flex flex-col px-5 mt-10 flex-nowrap w-full overflow-x-scroll no-scrollbar'>
              <h1 className='text-white text-6xl font-semibold'>{movie.name}</h1>
             
              <div className='flex flex-row flex-wrap mt-4 gap-x-2 gap-y-2 text-neutral-100'>
                <div className='flex flex-row items-center bg-primary-30 px-2 py-1 rounded-2xl '>
                  <PlayIcon className='h-5 w-5'/>
                  <div className='text-sm ml-1'>{movie.runningWeek}. Woche</div>
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
                  <div className='text-sm ml-1'>{movie.genres.join('/')}</div>
                </div>
              </div>
              <ul className='text-neutral-200 mt-3 ml-2 text-sm'>
                <li> <b>Director</b>: {movie.director}</li>
                <li><b>With:</b> {movie.actors.join(', ')}</li>
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
                        Today... : {date}
                      </p>
                      <div className='flex flex-row mt-4 gap-x-2'>
                        {movie.showings.filter((item) => item.date === date).map((item)=>(
                          <Link href={router.query.slug + "/show/" + item.id}>
                            <div className='flex flex-col md:gap-y-20 gap-y-10 text-center bg-accent-30 p-3 hover:bg-accent-40 rounded-md' key={item.id}>
                              <p className='md:text-4xl text-3xl'>
                                {item.time}
                              </p>
                              <p className='text-base'>
                                D-Box, OV
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