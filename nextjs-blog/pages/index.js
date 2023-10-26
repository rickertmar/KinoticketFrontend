import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Function to convert a string to a slug
function convertToSlug(inputString) {
  const sanitizedString = inputString.replace(/[^\w\s]/gi, '');
  const lowercaseString = sanitizedString.toLowerCase();
  const slug = lowercaseString.replace(/\s+/g, '-');
  return slug;
}

export default function indexPage() {
  const [movieSet, setMovieSet] = useState([]);
  useEffect(() => {
      axios
        .get(process.env.API_URL + '/showings', {
          headers: { 'Content-Type': 'application/json' },
          validateStatus: function (status) {
            return status >= 200 && status <= 302;
          },
        })
        .then(function (response) {
          const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in "YYYY-MM-DD" format
          console.log(response.data)
          const movies = response.data.reduce((acc, showing) => {
            const existingMovie = acc.find((movie) => movie.id === showing.movie.id);
            const currentTime = showing.time.split('T')[0];
          
            if (currentTime === currentDate) {
              if (existingMovie) {
                // Movie already exists in the result, add the showing
                existingMovie.showings.push({
                  id: showing.id,
                  date: currentTime,
                  time: showing.time.split('T')[1].slice(0, 5),
                });
                existingMovie.showings.sort((a, b) => a.time.localeCompare(b.time));
              } else {
                // New movie, add it to the result
                acc.push({
                  id: showing.movie.id,
                  title: showing.movie.title,
                  imageSrc: showing.movie.imageSrc,
                  showings: [
                    {
                      id: showing.id,
                      date: currentTime,
                      time: showing.time.split('T')[1].slice(0, 5),
                    },
                  ],
                });
              }
            } else if (!existingMovie) {
              // Movie doesn't have showings today, add it to the result
              acc.push({
                id: showing.movie.id,
                title: showing.movie.title,
                imageSrc: showing.movie.imageSrc,
                showings: [],
              });
            }
          
            return acc;
          }, []);
          setMovieSet(movies);
          console.log(movies +"test")
        })
        .catch(function (error) {
          console.error(error);
        });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pb-10">
      <Head>
        <title>Movie Collection - DHBW Kino</title>
        <meta
          name="description"
          content="Explore our diverse collection of movies. Find showtimes and book tickets online."
        />
      </Head>

      <h1 className="w-fit text-white font-semibold text-4xl mt-10"> OUR MOVIE COLLECTION</h1>
      <div className="mt-6 gap-y-10 gap-x-6 flex flex-row flex-shrink-0 flex-wrap w-[18rem] md:w-[38rem] lg:w-[57rem] xl:w-[77rem]">
        {movieSet.map((movie) => (
          <div key={movie.id} className="shrink-0 dark:bg-primary-20 bg-primary-30 rounded p-2 w-[18rem] shadow-lg dark:shadow-black shadow-neutral-800 overflow-hidden max-w-fit">
            <div className="h-20 pl-2 flex flex-col justify-center">
              <h2 className="text-2xl text-white font-semibold">{movie.title}</h2>
            </div>
            <Link href={"movies/" + movie.id}>
              <div className="overflow-hidden bg-gray-200 hover:opacity-75">
                <img
                  src={movie.imageSrc}
                  alt=""
                  className="h-[25rem] w-full object-cover object-center hover:opacity-75"
                />
              </div>
            </Link>

            <div className="grid grid-cols-4 grid-rows-1 gap-x-2 gap-y-1 overflow-hidden justify-items-center mt-2 mb-2">
              {movie.showings.slice(0, 7).map((showing) => (
                <Link key={showing.id} href={{pathname: "movies/" + movie.id+ "/show/" + showing.id, query:{movieId: movie.id}}} className="rounded-md px-3 py-2 text-sm font-semibold bg-primary-10 hover:bg-primary-40 text-white">
                  {showing.time}
                </Link>
              ))}
              <Link href={"movies/" + movie.id} className="rounded-md px-2 py-2 text-sm font-semibold bg-accent-30 text-white hover:bg-accent-20">
                MORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
