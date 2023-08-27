import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; 


export default function Home() {
  return (
    <>
      <Head>
        <title>DHBW Kino</title>
      </Head>

      <main>
        <div className={styles.imageContainer}>
          <Image src="/DHBWKino.png" alt="DHBW Kino" width={1000} height={200} />
        </div>
      </main>
    </>
  )
}
