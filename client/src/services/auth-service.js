import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

async function register(registerData) {
  try {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function login(loginData) {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { register, login };
