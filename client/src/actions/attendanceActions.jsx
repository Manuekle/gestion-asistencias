import axios from 'axios';
import {
  ATTENDANCE_CREATE_REQUEST,
  ATTENDANCE_CREATE_SUCCESS,
  ATTENDANCE_CREATE_FAIL
} from '../constants/attendanceConstants';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;
const pro = import.meta.env.VITE_REACT_APP_API_PRODUCTION;

// Caché simple para almacenar respuestas recientes
const responseCache = {
  data: new Map(),
  timestamp: new Map(),

  // Tiempo de expiración de 5 minutos
  EXPIRATION_TIME: 5 * 60 * 1000,

  get(key) {
    if (!this.data.has(key)) return null;

    const timestamp = this.timestamp.get(key);
    if (Date.now() - timestamp > this.EXPIRATION_TIME) {
      // Eliminar entradas expiradas
      this.data.delete(key);
      this.timestamp.delete(key);
      return null;
    }

    return this.data.get(key);
  },

  set(key, value) {
    this.data.set(key, value);
    this.timestamp.set(key, Date.now());
  }
};

//* CREATE
export const createAttendance =
  (estu_id, clas_id, qr_url) => async (dispatch) => {
    try {
      dispatch({
        type: ATTENDANCE_CREATE_REQUEST
      });

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      // Crear una clave única para esta solicitud
      const cacheKey = `attendance_${estu_id}_${clas_id}_${qr_url}`;

      // Verificar si tenemos una respuesta en caché
      const cachedResponse = responseCache.get(cacheKey);
      if (cachedResponse) {
        dispatch({
          type: ATTENDANCE_CREATE_SUCCESS,
          payload: cachedResponse
        });
        return cachedResponse;
      }

      const { data } = await axios.post(
        `${dev}/asistencia/create`,
        {
          estu_id,
          clas_id,
          qr_url
        },
        config
      );

      // Guardar la respuesta en caché
      responseCache.set(cacheKey, data);

      dispatch({
        type: ATTENDANCE_CREATE_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      dispatch({
        type: ATTENDANCE_CREATE_FAIL,
        payload: error.response?.data || { message: error.message }
      });

      throw error;
    }
  };
