import { useState, useEffect } from 'react';
import { register } from '../services/auth-service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Alert from './Alert';

function RegisterForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({
    color: '',
    message: searchParams.get('message'),
  });

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  useEffect(() => {
    const message = searchParams.get('message');
    switch (message) {
      case 'email-exists':
        setAlert({ color: 'danger', message: 'Email already exists.' });
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
    register(form)
      .then(() => navigate('/login?message=successful'))
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          navigate('/register?message=email-exists');
        }
        setErrors(err.response?.data || {});
      });
  };

  return (
    <>
      <h1 className="display-1 mb-3">Register</h1>
      {alert.message && <Alert color={alert.color} message={alert.message} />}
      <div className="card shadow mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="first_name"
                id="first_name"
                className={`form-control ${
                  errors?.first_name ? 'is-invalid' : ''
                }`}
                placeholder="First name:"
                value={form.first_name}
                onChange={handleChange}
              />
              <label htmlFor="first_name">First name:</label>
              {errors?.first_name && (
                <span className="invalid-feedback">{errors.first_name}</span>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="last_name"
                id="last_name"
                className={`form-control ${
                  errors?.last_name ? 'is-invalid' : ''
                }`}
                placeholder="Last name:"
                value={form.last_name}
                onChange={handleChange}
              />
              <label htmlFor="last_name">Last name:</label>
              {errors?.last_name && (
                <span className="invalid-feedback">{errors.last_name}</span>
              )}
            </div>
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
            <div className="form-floating mb-3">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className={`form-control ${
                  errors?.confirm_password ? 'is-invalid' : ''
                }`}
                placeholder="Confirm password:"
                value={form.confirm_password}
                onChange={handleChange}
              />
              <label htmlFor="confirm_password">Confirm password:</label>
              {errors?.confirm_password && (
                <span className="invalid-feedback">
                  {errors.confirm_password}
                </span>
              )}
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
