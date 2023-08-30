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
        <img className={styles.image} src="/DHBWKino.png" alt="DHBW Kino Logo" />
        </div>
      </main>
    </>
  )
}
