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
      <main className="mx-auto max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 dark:text-white">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
