import MyImage from '../components/MyImage';
import styles from '../styles/Home.module.css';

function logIn() {
  return (
    <div>
      <MyImage />
      <h1 className={styles.title}>Log in</h1>

    </div>
  );
}

export default logIn;
