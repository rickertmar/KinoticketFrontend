import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    alert('Your request has been sent');
    window.location.reload();     // Refresh the page
  };

  return (
    <div>
      <h1 className={styles.title}>Contact Form</h1>
      <div className={styles.blueBackground}>
        <p>Our service team is happy to assist you:</p>
        <ul>
          <li>By phone at 0621 / xx xx xx (14 ct/min, max. 42 ct/min), daily from 2:00 PM to 8:00 PM</li>
          <li>Via email at service@dhbwkino.de</li>
          <li>Through the contact form below</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
  <label htmlFor="email">Your Email Address:</label>
  <input 
    type="email"
    id="email"
    className={styles.formControl} 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <label htmlFor="topic">Topic:</label>
  <select 
    id="topic"
    className={styles.formControl} 
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    required
  >
    <option value="">Select a Topic</option>
    <option value="feedback">Feedback</option>
    <option value="question">Question</option>
    <option value="complaint">Complaint</option>
  </select>

  <label htmlFor="message">Your Message:</label>
  <textarea 
    id="message"
    className={styles.formControl} 
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    required
  ></textarea>


        {/* Send Button */}
        <button className={styles.sendButton} type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
