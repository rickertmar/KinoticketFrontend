import Image from 'next/image';
import styles from '../styles/Home.module.css'; 

function MyImage() {
  return (
    <div className={styles.imageContainer}>
      <Image src="/CineMock.png" alt="Cine Mock" width={1000} height={200} />
    </div>
  );
}

export default MyImage;


