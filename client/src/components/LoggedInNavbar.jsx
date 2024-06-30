import { NavLink } from 'react-router-dom';

function LoggedInNavbar() {
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/pets" end>
          All Pets
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/pets/new" end>
          Add Pet
        </NavLink>
      </li>
    </ul>
  );
}

export default LoggedInNavbar;
