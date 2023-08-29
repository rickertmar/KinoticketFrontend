import Navbar from '../components/navbar';
import Menu from '../components/Menu';
import Footer from '../components/footer';
import MyImage from '../components/MyImage';


function Layout({ children }) {
  return (
    <div>
      <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
