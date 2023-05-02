import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="nav-bar">
    <NavLink className="nav-Header" to="/" style={{ color: '#000' }}>
      <div className="logo">
        <img alt="backSpace" />
      </div>
    </NavLink>
    <div>
      <input type="text" />
    </div>
  </nav>
);

export default NavBar;
