import Link from 'next/link'

const movies = [
  {
    id: 1,
    name: 'Joker',
    imageSrc: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    showings:[
      {
        id: 1,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 2,
        date: '01.09',
        time: '12:30',
      },
      {
        id: 3,
        date: '01.09',
        time: '17:30',
      },
      {
        id: 4,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 5,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 6,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 7,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 8,
        date: '31.08',
        time: '17:30',
      },
    ]
  },
  {
    id: 2,
    name: 'Avatar: The Way of Water',
    imageSrc: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg',
    showings:[
      {
        id: 1,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 2,
        date: '01.09',
        time: '12:30',
      },
      {
        id: 3,
        date: '01.09',
        time: '17:30',
      }
    ]
  },
  {
    id: 3,
    name: "Harry Potter and the Sorcerer's Stone",
    imageSrc: 'https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg',
    showings:[
      {
        id: 1,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 2,
        date: '01.09',
        time: '12:30',
      },
      {
        id: 3,
        date: '01.09',
        time: '17:30',
      },
      {
        id: 3,
        date: '01.09',
        time: '17:30',
      }
    ]
  },
  {
    id: 4,
    name: 'Joker',
    imageSrc: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    showings:[
      {
        id: 1,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 2,
        date: '01.09',
        time: '12:30',
      },
      {
        id: 3,
        date: '01.09',
        time: '17:30',
      }
    ]
  },
  {
    id: 5,
    name: 'Joker',
    imageSrc: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    showings:[
      {
        id: 1,
        date: '31.08',
        time: '17:30',
      },
      {
        id: 2,
        date: '01.09',
        time: '12:30',
      },
      {
        id: 3,
        date: '01.09',
        time: '17:30',
      }
    ]
  }
]


export default function Example() {
  return (
      <div className="flex flex-col justify-center items-center">
      <h1 className='w-fit'> OUR MOVIE COLLECTION</h1>
        <div className="mt-6 gap-y-10 gap-x-6 flex flex-row flex-shrink-0 flex-wrap w-[18rem] md:w-[38rem] lg:w-[57rem] xl:w-[77rem]">
          
          {movies.map((movie) => (
            <div key={movie.id} className="shrink-0 dark:bg-primary-20 bg-primary-30 rounded p-2 w-[18rem] shadow-lg dark:shadow-black shadow-neutral-800 overflow-hidden max-w-fit">
              <div className="h-20 pl-2 flex flex-col justify-center">
                  <h3 className="text-2xl text-white font-semibold">
                    {movie.name}
                  </h3>
              </div>
              <Link href={"movies/" + movie.name}>
                <div className="overflow-hidden bg-gray-200 hover:opacity-75">
                  <img
                    src={movie.imageSrc}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:opacity-75"
                  />
                </div>
              </Link>
              
              <div className='grid grid-cols-4 grid-rows-1 gap-x-2  gap-y-1 overflow-hidden justify-items-center mt-2 mb-2'>
                {movie.showings.slice(0, 7).map((showing) =>
                <Link key={showing.id} href='#'className='rounded-md px-3 py-2 text-sm font-semibold bg-primary-10 hover:bg-primary-40 text-white'>
                  {showing.time}
                </Link>
                  )}
                  <Link href={"movies/" + movie.name} className='rounded-md px-2 py-2 text-sm font-semibold bg-accent-30 text-white hover:bg-accent-20 '>
                  MORE
                </Link>
              </div>
              </div>
          ))}
        </div>
      </div>
      
    
  )
}
