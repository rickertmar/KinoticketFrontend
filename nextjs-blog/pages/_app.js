import Layout from '../components/layout'
import '../styles/globals.css'
import { useEffect } from 'react';
//space for useEffects globally
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
  }, [Component]);
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) 
};
export default MyApp