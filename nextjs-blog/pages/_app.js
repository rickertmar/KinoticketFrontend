import '../styles/globals.css';
import Layout from "../components/layout";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated when navigating to the profile page
    useEffect(() => {
        if (router.pathname === '/profile') {
        const authToken = Cookies.get('access_token')/* Logic to check if the user is authenticated, e.g., from a cookie */;
        if (!authToken) {
            router.push('/'); // Redirect to login page if not authenticated
        } else {
            setIsAuthenticated(true);
        }
        }
    }, [router.pathname]);
    return(
        <Layout>
            <Component isAuthenticated={isAuthenticated}{...pageProps} />
        </Layout>
    ) }
