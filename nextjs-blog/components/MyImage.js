import Image from 'next/image';
import styles from '../styles/Home.module.css'; 

function MyImage() {
  return (
    <div className={`${styles.imageContainer} ${styles.roundedImageContainer}`}>
          <Image src="/CinemaConcessions.png" alt="Cinema Concessions" width={120} height={40} />
    </div>
  );
}

export default MyImage;
