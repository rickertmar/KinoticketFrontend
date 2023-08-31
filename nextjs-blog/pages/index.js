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
    id: 3,
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
    <div className="">
      <h1> OUR MOVIE COLLECTION</h1>
      <div className="">
        
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-5">
          
          {movies.map((movie) => (
            <div key={movie.id} className="group relative bg-primary-30 rounded p-2">
              <div className="pl-2 mt-1flex justify-between mb-2">
                <div>
                  <h3 className="text-2xl mt-1 text-white">
                    {movie.name}
                  </h3>
                </div>
              </div>
              <Link href={"movies/" + movie.name}>
                <div className="overflow-hidden bg-gray-200 lg:aspect-none hover:opacity-75">
                  <img
                    src={movie.imageSrc}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:opacity-75"
                  />
                </div>
              </Link>
              
              <div className='grid grid-cols-4 grid-rows-1 gap-x-2  gap-y-1 overflow-hidden justify-items-center mt-2'>
                {movie.showings.slice(0, 7).map((showing) =>
                <Link key={showing.id} href='#'className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-primary-10 hover:bg-primary-40 hover:text-white'>
                {showing.time}
              </Link>
                )}
                <Link href='#'className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-accent-30 hover:bg-accent-50 hover:text-white'>
                MORE
              </Link>
              </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
