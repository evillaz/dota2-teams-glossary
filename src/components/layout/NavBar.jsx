import { NavLink } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { searchTeam } from '../../redux/teams/teamSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const onSearch = (e) => {
    dispatch(searchTeam(e.target.value));
  };

  const navBarClasses = 'nav-bar f';
  const navHeaderClasses = 'nav-Header f';
  const searchBoxClasses = 'searchBox f';
  return (
    <nav className={navBarClasses}>
      <NavLink className={navHeaderClasses} to="/home" style={{ color: '#000' }}>
        <div className="backSpace">
          <HiChevronLeft />
        </div>
      </NavLink>
      <input
        className={searchBoxClasses}
        type="text"
        onChange={onSearch}
        placeholder="Search for a Team"
      />
      <div />
    </nav>
  );
};

export default NavBar;
