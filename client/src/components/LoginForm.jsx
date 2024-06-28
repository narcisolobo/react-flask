import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../services/auth-service';
import Alert from './Alert';

function LoginForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({
    color: '',
    message: searchParams.get('message'),
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const message = searchParams.get('message');
    switch (message) {
      case 'successful':
        setAlert({
          color: 'info',
          message: 'Registration successful! Please log in.',
        });
        break;
      case 'email-exists':
        setAlert({ color: 'danger', message: 'Email already exists.' });
        break;
      case 'unauthorized':
        setAlert({ color: 'warning', message: 'Unauthorized access.' });
        break;
      case 'invalid-credentials':
        setAlert({ color: 'warning', message: 'Invalid credentials.' });
        break;
      default:
        setAlert({ color: '', message: '' });
        break;
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ color: '', message: '' });
    setSearchParams('');
    login(form)
      .then(() => navigate('/pets'))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setSearchParams({ message: 'invalid-credentials' });
        }
        setErrors(err.response?.data || {});
      });
  };

  return (
    <>
      <h1 className="display-1 mb-3">Login</h1>
      {alert.message && <Alert color={alert.color} message={alert.message} />}
      <div className="card shadow mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="email"
                id="email"
                className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                placeholder="Email:"
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email:</label>
              {errors?.email && (
                <span className="invalid-feedback">{errors.email}</span>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${
                  errors?.password ? 'is-invalid' : ''
                }`}
                placeholder="Password:"
                value={form.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password:</label>
              {errors?.password && (
                <span className="invalid-feedback">{errors.password}</span>
              )}
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
