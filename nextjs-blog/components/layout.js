import Navbar from '../components/navbar';



function Layout({ children }) {
  return (
    <div className='bg-primary-40 font-nunito'>
      <Navbar/>
      <main className="min-h-screen max-w-7xl  mx-auto ">{children}</main>
     
    </div>
  );
}

export default Layout;
