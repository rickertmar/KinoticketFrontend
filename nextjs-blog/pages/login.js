import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

function logIn() {
  const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API request to authenticate
    try {
      const response = await fetch('api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        var data = await response.json();
        console.log(data)
        // Store authentication data and redirect
        localStorage.setItem('access_token', data.access_token);
        console.log(localStorage.getItem('access_token'))
        router.push('/information'); // Redirect to dashboard
        console.log(localStorage.getItem('access_token'))
      } else {
        // Handle authentication failure
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.logInContainer}>
      <div className={styles.card}>
        {!showSignUp ? (
          <>
             <h2 className={styles.greyTitle}>Log in</h2>
            <form onSubmit={handleSubmit}>
              <input value={email} onChange={(e) => setEmail(e.target.value)}className={styles.inputField} type="text" placeholder="Email" required />
              <input  value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} type="password" placeholder="Password" required />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.sendButtonLogIn}>Log in</button>
              </div>
            </form>
          </>
        ) : (
          <>
             <h2 className={styles.greyTitle}>Create an account</h2>
            <form>
              <input className={styles.inputField} type="text" placeholder="First Name" required />
              <input className={styles.inputField} type="text" placeholder="Last Name" required />
              <input className={styles.inputField} type="email" placeholder="Email" required />
              <input className={styles.inputField} type="password" placeholder="Password" required />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.sendButtonLogIn}>Create account</button>
              </div>
            </form>
          </>
        )}
        <div className={styles.buttonContainer}>
          <button onClick={toggleSignUp} className={styles.sendButtonLogIn}>
            {showSignUp ? 'Back to Login' : 'Create an account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default logIn;
