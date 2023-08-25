
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>DHBW Kino</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/movies/test">Link</Link>
      </main>
    </>
      
  )
}
