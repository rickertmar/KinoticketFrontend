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
      }
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt=""
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-large text-white">
                    <Link href={"movies/" + product.name}>
                    <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
              </div>
              <div>
                <p> fiuadspfiuadpsf</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
