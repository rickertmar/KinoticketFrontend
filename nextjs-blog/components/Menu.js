import { useRouter } from 'next/router';
import styles from '../styles/Menu.module.css';
import MyImage from './MyImage';

const Menu = () => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.menuNav}>
    <ul className={styles.menuList}>
      <MyImage/>
      <li className={`${styles.menuItem} ${styles.firstMenuItem}`}>
        <button className={styles.menuButton} onClick={() => navigate('/')}>Programm</button>
      </li>
      <li className={styles.menuItem}>
        <button className={styles.menuButton} onClick={() => navigate('/Infos')}>Infos</button>
      </li>
      <li className={styles.menuItem}>
        <button className={styles.menuButton} onClick={() => navigate('/Contact')}>Contact</button>
      </li>
      <li className={styles.menuItem}>
        <button className={styles.menuButton} onClick={() => navigate('/logInPage')}>Account</button>
      </li>
    </ul>
  </nav>
);
};
export default Menu;
