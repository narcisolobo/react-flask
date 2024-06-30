import { useContext } from 'react';
import LogOutButton from './LogOutButton';
import { AuthContext } from '../context/AuthProvider';

function UserBar() {
  const { email } = useContext(AuthContext);

  return (
    <header className="py-2 bg-body-secondary">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">{email}</p>
        <LogOutButton />
      </div>
    </header>
  );
}

export default UserBar;
