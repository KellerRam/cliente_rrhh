import axios from 'axios';

const API_BASE_URL = 'http://localhost:8800/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Función para obtener todos los empleados (sin sucursal)
export const getEmpleados = async () => {
  try {
    const response = await apiClient.get('/empleado');
    return response.data;
  } catch (error) {
    console.error('Error en getEmpleados:', error);
    throw error;
  }
};

// NUEVA FUNCIÓN: Obtener empleados con nombre de sucursal
export const getEmpleadosConSucursal = async () => {
  try {
    const response = await apiClient.get('/empleado/empleadosucursal');
    return response.data;
  } catch (error) {
    console.error('Error en getEmpleadosConSucursal:', error);
    throw error;
  }
};

export default {
  getEmpleados,
  getEmpleadosConSucursal
};