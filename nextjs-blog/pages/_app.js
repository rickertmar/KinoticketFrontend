import '../styles/globals.css';
import Layout from "../components/layout";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [isLoad, setIsLoad] = useState('true');
  // Check if the user is authenticated when navigating to the profile page
    useEffect(() => {
        const authjwt = parseJwt(Cookies.get('access_token'));
        const refreshjwt = parseJwt(Cookies.get('refresh_token'));
        console.log(authjwt)
        if(authjwt !== undefined){
            setIsLoad(false)
            if(authjwt.exp*1000 > Date.now()){
                setIsAuthenticated(true)
                setRole(authjwt.ROLE)
            }else{
                if(refreshjwt.exp*1000 > Date.now()){
                    axios.defaults.headers.common['Authorization'] = `Bearer ${authjwt.access_token}`;

                    axios.post('/api/auth/refresh-token', {headers:{ 'Content-Type': 'application/json'}})
                    .then(function (response){
                        const { access_token, refresh_token } = response.data;
                        Cookies.set('access_token', access_token)
                        Cookies.set('refresh_token', refresh_token)
                        setIsAuthenticated(true)
                        setRole(authjwt.ROLE)
                        router.push("/user/profile")
                        }
                    )
                    .catch(function (error){
                    console.error('Error:', error);
                        }
                    )
                }else{
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
                    setIsAuthenticated(false);
                    setRole('')
                }
            }
        }else{
            setIsLoad(true)
        }
        
    }, []);
    
    return(
        <Layout>
            <Component isAuthenticated={isAuthenticated} role={role} loading={isLoad} {...pageProps} />
        </Layout>
    ) }
