import React, { useState } from 'react';
import MyImage from '../components/MyImage';
import styles from '../styles/Home.module.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    alert('Deine Anfrage wurde abgesendet');
    window.location.reload();     // Refresh the page
  };

  return (
    <div>
      <MyImage />
      <h1 className={styles.title}>Kontaktformular</h1>

      <div className={styles.darkPurpleBackground}>
        <p>Unser Serviceteam hilft dir gerne weiter:</p>
        <ul>
          <li>telefonisch unter 0621 / xx xx xx (14 ct/min, max. 42 ct/min), täglich von 14:00 Uhr bis 20:00 Uhr</li>
          <li>per E-Mail an service@cinemock.de</li>
          <li>über das nachfolgende Kontaktformular</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Ihre E-Mail-Adresse:</label>
        <input 
          type="email"
          id="email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required  // Making this field mandatory
        />

        <label htmlFor="topic">Thema:</label>
        <select 
          id="topic"
          className={styles.dropdown}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required  // Making this field mandatory
        >
          <option value="">Wählen Sie ein Thema</option>
          <option value="feedback">Feedback</option>
          <option value="question">Frage</option>
          <option value="complaint">Beschwerde</option>
        </select>

        <label htmlFor="message">Ihre Nachricht:</label>
        <textarea 
          id="message"
          className={styles.textArea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required  // Making this field mandatory
        ></textarea>

        {/* Send Button */}
        <button className={styles.sendButton} type="submit">Senden</button>
      </form>
    </div>
  );
}

export default Contact;
