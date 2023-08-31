import styles from '../styles/Home.module.css';

function Infos() {
  const onTestButtonClick = async (e) => {
    e.preventDefault();
    console.log('Bearer '+ localStorage.getItem('access_token'))
    // Make API request to authenticate
    try {
      const response = await fetch('api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ localStorage.getItem('access_token')
        },
      });

      if (response.ok) {
        console.log(response);
      } else {
        // Handle authentication failure
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <h1 className={styles.title}>Info page</h1>

      <div className={styles.blueBackground}>
        <p>Our service team is happy to assist you:</p>
        <ul>
          <li>By phone at 0621 / xx xx xx (14 ct/min, max. 42 ct/min), daily from 2:00 PM to 8:00 PM</li>
          <li>Via email at service@dhbwkino.de</li>
        </ul>
        <p>&nbsp;</p>
        <p>Our location in Baden-Württemberg features two multiplex cinemas right in the heart of the city. With 18 theaters and approximately 3,600 seats, we offer the city an enormous variety and serve as Mannheim's cultural hub. Nearly one million visitors come here annually for top-notch cinema experiences. Perfect sound and supreme seating comfort with modern D-Box seats offer the highest level of cinematic enjoyment.</p>
        <p>&nbsp;</p>
        <p>Thanks to our two locations, we can provide a wide range of entertainment options. From big blockbusters to thought-provoking art-house films, as well as films in their original languages, there's something for every taste. Live events such as broadcasts from the Metropolitan Opera and many other global cities are, of course, also available.</p>
        <button onClick={onTestButtonClick}>Test Connection</button>
      </div>

      <div className={styles.imageContainer}>
        <img className={styles.image} src="/CinemaConcessions.png" alt="Cinema Concessions" />
        <img className={styles.image} src="/CinemaEntrance.png" alt="Cinema Entrance" />
        <img className={styles.image} src="/CinemaEntrance2.png" alt="CinemaEntrance 2" />
        <img className={styles.image} src="/CinemaScreen.png" alt="Cinema Screen" />
      </div>
    </div>
  );
}

export default Infos;
