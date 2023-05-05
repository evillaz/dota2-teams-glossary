import { NavLink, useLocation } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { searchTeam } from '../../redux/teams/teamSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const onSearch = (e) => {
    dispatch(searchTeam(e.target.value));
  };

  const path = useLocation();

  const navBarClasses = 'nav-bar f';
  const navHeaderClasses = 'nav-Header f';
  const searchBoxClasses = 'searchBox f';
  return (
    <nav className={navBarClasses}>
      <NavLink className={navHeaderClasses} to="/home" style={{ color: '#000' }}>
        <div className="backSpace">
          <HiChevronLeft style={{ fontSize: '2rem' }} />
        </div>
      </NavLink>
      {!path.pathname.includes('teams') && (
        <>
          <input
            className={searchBoxClasses}
            type="text"
            onChange={onSearch}
            placeholder="Search for a Team"
          />
          <div />
        </>
      )}
      {path.pathname.includes('teams') && (
        <>
          <h1 className="detailsTitle">Team Info</h1>
          <div />
        </>
      )}
    </nav>
  );
};

export default NavBar;
