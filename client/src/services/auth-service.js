import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

async function registerService(registerData) {
  try {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function loginService(loginData) {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { registerService, loginService };
