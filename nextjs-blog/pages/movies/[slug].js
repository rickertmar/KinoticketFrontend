//Dynamic Routing

import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Movies() {
    const router = useRouter()
    return (
      <>
        <Head>
          <title>Kino {router.query.slug}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p className='bg-accent'>Post: {router.query.slug}</p>
        </main>
      </>
    )
  }