import Head from 'next/head';

export default function Imprint() {
  return (
    <div className='text-white py-5'>
      <Head>
        <title>Imprint - DHBW Kino</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1 className='text-4xl'>Imprint</h1>

      <p className='pt-2'>
        This website is operated by:
        <br />
        Konrad Lorenz
        <br />
        Gerhard-Marcks-str. 6a
        <br />
        68163 Mannheim
        <br />
        Deutschland
      </p>

      <h2 className='text-2xl pt-3'>Contact Information:</h2>
      <p>
        Email: Konrad-Lorenz@outlook.com<br />
        Phone: +49 15231883345
      </p>



      <h2 className='text-2xl pt-3'>Copyright Information:</h2>
      <p>
        © 2023 DHBW Kino. All rights reserved.
      </p>
    </div>
  );
}
