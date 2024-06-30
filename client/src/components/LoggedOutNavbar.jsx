import { NavLink } from 'react-router-dom';

function LoggedOutNavbar() {
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/register" end>
          Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login" end>
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default LoggedOutNavbar;
