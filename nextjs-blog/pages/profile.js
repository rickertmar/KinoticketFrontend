import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the access token from the 'access_token' cookie
    const accessToken = Cookies.get('access_token')

    // Check if the access token is available
    if (accessToken) {
      // Set the Authorization header with the bearer token
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Simulate an Axios request to fetch user data
      // Replace the URL with your actual API endpoint
      axios.get('/api/users')
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'access_token') {
        return value;
      }
    }
    return null;
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div className='text-white'>
          <p>Email: {userData.email}</p>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <h2>Shipping Address</h2>
          <p>Street: {userData.shipping.street}</p>
          <p>City: {userData.shipping.city}</p>
          <p>Country: {userData.shipping.country}</p>
          <p>Postcode: {userData.shipping.postcode}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
