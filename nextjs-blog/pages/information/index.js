import Head from "next/head";

export default function Infos() {
  return (
    <div className="bg-primary-20 my-10">
      <Head>
        <title>About Our Cinema - DHBW Kino</title>
        <meta
          name="description"
          content="Learn about our cinema located in Mannheim, Baden-Württemberg. Explore our theaters, features, and offerings."
        />
      </Head>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 text-white">
        <div>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "#90DDF0" }}
          >
            About Our Cinema
          </h2>
          <p className="mt-4 text-white">
            Located in the heart of Baden-Württemberg, our two multiplex cinemas
            serve as Mannheim's cultural hub, offering top-notch cinematic
            experiences to nearly one million visitors annually.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Location</dt>
              <dd className="mt-2 text-sm">Mannheim, Baden-Württemberg</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Theaters</dt>
              <dd className="mt-2 text-sm">
                18 theaters with approx. 3,600 seats
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Features</dt>
              <dd className="mt-2 text-sm">
                Modern D-Box seats, state-of-the-art sound system
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Offerings</dt>
              <dd className="mt-2 text-sm">
                Blockbusters, art-house films, live events
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="/CinemaEntrance2.png"
            alt="Cinema Entrance 2"
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/CinemaConcessions.png"
            alt="Cinema Concessions"
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/CinemaEntrance.png"
            alt="Cinema Entrance"
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/CinemaScreen.png"
            alt="Cinema Screen"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
