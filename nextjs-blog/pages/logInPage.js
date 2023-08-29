import React, { useState } from 'react';
import MyImage from '../components/MyImage';
import styles from '../styles/Home.module.css';

function logIn() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className={styles.logInContainer}>
      <div className={styles.card}>
        {!showSignUp ? (
          <>
             <h2 className={styles.greyTitle}>Log in</h2>
            <form>
              <input className={styles.inputField} type="email" placeholder="Email" required />
              <input className={styles.inputField} type="password" placeholder="Password" required />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.sendButton}>Log in</button>
              </div>
            </form>
          </>
        ) : (
          <>
             <h2 className={styles.greyTitle}>Create an Account</h2>
            <form>
              <input className={styles.inputField} type="text" placeholder="First Name" required />
              <input className={styles.inputField} type="text" placeholder="Last Name" required />
              <input className={styles.inputField} type="email" placeholder="Email" required />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.sendButton}>Create Account</button>
              </div>
            </form>
          </>
        )}
        <div className={styles.buttonContainer}>
          <button onClick={toggleSignUp} className={styles.sendButton}>
            {showSignUp ? 'Back to Log In' : 'Create an Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default logIn;
