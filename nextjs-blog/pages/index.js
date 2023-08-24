//LOGIN VIEW
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); // <-- Use the router hook here

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Replace this mock authentication with your real authentication logic
    if (username && password) {
      router.push('/dashboard'); // <-- Navigate to the dashboard
    } else {
      alert("Please enter username and password");
    }
  };

 
  return (
    <body>
      <div className={styles.container}>
      <div className={`${styles.card} ${styles.loginCard}`}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formItem}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formItem}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formItem}>
            <button type="submit" className={styles.loginButton}>Login</button>
          </div>
        </form>
      </div>
    </div>
    </body>
    
  );
}
