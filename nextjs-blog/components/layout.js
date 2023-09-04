import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Footer from '../components/footer';

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('access_token'); /* Logic to check if the user is authenticated, e.g., from a cookie */
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  return (
    <div className='font-nunito bg-primary-30'>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="min-h-screen max-w-7xl  mx-auto px-5">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
