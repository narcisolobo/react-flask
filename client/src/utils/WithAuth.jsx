import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const WithAuth = (Component) => {
  return (props) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
      return <Navigate to="/login?message=unauthorized" />;
    }

    return <Component {...props} />;
  };
};

export default WithAuth;
