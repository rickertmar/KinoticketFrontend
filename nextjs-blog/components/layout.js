import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';



export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const authToken = Cookies.get('access_token')/* Logic to check if the user is authenticated, e.g., from a cookie */;
      if (authToken) {
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false)
      }
    })

  return (
    <div className='font-nunito dark:bg-primary-10 bg-fixed bg-primary-40'>
      <Navbar isAuthenticated={isAuthenticated}/>
      <main className="min-h-screen max-w-7xl  mx-auto px-5 ">{children}</main>
    </div>
  );
}
