import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function LogOutButton() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login?message=logout-successful');
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="btn btn-sm btn-secondary">
      Logout
    </button>
  );
}

export default LogOutButton;
