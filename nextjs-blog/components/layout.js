import Navbar from '../components/navbar';
import Menu from '../components/Menu';
import Footer from '../components/footer';


function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
