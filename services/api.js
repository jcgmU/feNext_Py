import axios from "axios";

// Configuración base para todas las llamadas a la API
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Obtiene todas las tareas
 * @returns {Promise<Array>} Lista de tareas
 */
export const getTasks = async () => {
  try {
    const response = await api.get("tasks/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    throw error;
  }
};

/**
 * Crea una nueva tarea
 * @param {string} title - Título de la tarea
 * @param {string} description - Descripción de la tarea
 * @returns {Promise<Object>} Tarea creada
 */
export const createTask = async (title, description) => {
  try {
    const response = await api.post("tasks/", { title, description });
    return response.data;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    throw error;
  }
};

/**
 * Obtiene una tarea por su ID
 * @param {number} id - ID de la tarea
 * @returns {Promise<Object>} Tarea solicitada
 */
export const getTaskById = async (id) => {
  try {
    const response = await api.get(`tasks/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener tarea ${id}:`, error);
    throw error;
  }
};

/**
 * Actualiza una tarea existente
 * @param {number} id - ID de la tarea a actualizar
 * @param {Object} updatedData - Datos a actualizar
 * @returns {Promise<Object>} Tarea actualizada
 */
export const updateTask = async (id, updatedData) => {
  try {
    const response = await api.put(`tasks/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar tarea ${id}:`, error);
    throw error;
  }
};

/**
 * Marca una tarea como completada o pendiente
 * @param {number} id - ID de la tarea
 * @param {boolean} completed - Estado de completado
 * @returns {Promise<Object>} Tarea actualizada
 */
export const toggleTaskStatus = async (id, completed) => {
  try {
    const response = await api.patch(`tasks/${id}/`, { completed });
    return response.data;
  } catch (error) {
    console.error(`Error al cambiar estado de tarea ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una tarea
 * @param {number} id - ID de la tarea a eliminar
 * @returns {Promise<boolean>} Confirmación de eliminación
 */
export const deleteTask = async (id) => {
  try {
    await api.delete(`tasks/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar tarea ${id}:`, error);
    throw error;
  }
};

// Exportamos el cliente axios configurado por si se necesita personalización adicional
export default api;
