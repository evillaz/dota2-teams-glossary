import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <>
    <NavBar />
    <div className="wrapper f">
      <Outlet />
    </div>
  </>
);

export default Layout;
