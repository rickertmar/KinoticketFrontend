import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Footer from './footer';
import LeftSidebar from './leftSidebar';
import RightSidebar from './rightSidebar';

async function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('')
    useEffect(() => {
      const authToken = Cookies.get('access_token');
      if(authToken){
        setIsAuthenticated(true);
        const jwt = parseJwt(authToken)
        setRole(jwt.ROLE)
      }else{
        setIsAuthenticated(false)
      }

    })

  return (
    <div className='font-nunito dark:bg-primary-10 bg-fixed bg-primary-40'>
      <Navbar isAuthenticated={isAuthenticated}/>
      <div className='flex flex-row justify-center'>
        <LeftSidebar ></LeftSidebar>
        <main className="min-h-screen sm:w-4/6 w-11/12 mx-5">{children}</main>

        <RightSidebar></RightSidebar>
      </div>
      
      <Footer></Footer>
      
    </div>
  );
}
