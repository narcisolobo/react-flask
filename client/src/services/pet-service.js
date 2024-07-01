import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function getAllPets() {
  try {
    const response = await api.get('/pets');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getOnePet(petId) {
  try {
    const response = await api.get(`/pets/${petId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createPet(petData) {
  try {
    const response = await api.post('/pets/create', petData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function editPet(petId, petData) {
  try {
    const response = await api.patch(`/pets/${petId}/update`, petData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deletePet(petId) {
  try {
    const response = await api.post(`/pets/${petId}/delete`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getAllPets, getOnePet, createPet, editPet, deletePet };
