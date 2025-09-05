// Importamos axios para hacer peticiones HTTP
import axios from 'axios';

// URL base de la API del backend
const API_URL = 'http://localhost:3000';

// Función para registrar usuario
const register = async (userData) => {
  const res = await axios.post(`${API_URL}/users`, userData);
  return res.data;
};

// Función para loguear usuario
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/users/login`, userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

// Esta es la función que elimina los datos del localStorage
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Exportamos las funciones en un objeto
const authService = {
  register,
  login,
  logout
};

export default authService;
