import Navbar from '../components/navbar';
import Footer from '../components/footer';



function Layout({ children }) {
  return (
    <div className='bg-primary-40 font-nunito'>
      <Navbar/>
      <main className="min-h-screen max-w-7xl  mx-auto ">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
