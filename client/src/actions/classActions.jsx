import axios from 'axios';
import {
  CLASS_DETAILS_REQUEST,
  CLASS_DETAILS_SUCCESS,
  CLASS_DETAILS_FAIL,
  CLASS_CREATE_REQUEST,
  CLASS_CREATE_SUCCESS,
  CLASS_CREATE_FAIL,
  CLASS_SHOW_REQUEST,
  CLASS_SHOW_SUCCESS,
  CLASS_SHOW_FAIL,
  CLASS_SIGNATURE_REQUEST,
  CLASS_SIGNATURE_SUCCESS,
  CLASS_SIGNATURE_FAIL,
  CLASS_QR_REQUEST,
  CLASS_QR_SUCCESS,
  CLASS_QR_FAIL,
  CLASS_DAY_REQUEST,
  CLASS_DAY_SUCCESS,
  CLASS_DAY_FAIL,
  CLASS_CANCEL_REQUEST,
  CLASS_CANCEL_SUCCESS,
  CLASS_CANCEL_FAIL,
  CLASS_ALL_REQUEST,
  CLASS_ALL_SUCCESS,
  CLASS_ALL_FAIL
} from '../constants/classConstants';

// Variables de entorno para API
const dev = import.meta.env?.VITE_REACT_APP_API_DEVELOPMENT || '';
const pro = import.meta.env?.VITE_REACT_APP_API_PRODUCTION || '';

// Sistema de caché optimizado
const responseCache = {
  data: new Map(),
  timestamp: new Map(),
  EXPIRATION_TIME: 5 * 60 * 1000, // 5 minutos

  get(key) {
    if (!this.data.has(key)) return null;

    const timestamp = this.timestamp.get(key);
    if (Date.now() - timestamp > this.EXPIRATION_TIME) {
      this.data.delete(key);
      this.timestamp.delete(key);
      return null;
    }

    return this.data.get(key);
  },

  set(key, value) {
    this.data.set(key, value);
    this.timestamp.set(key, Date.now());
  },

  invalidateByPrefix(prefix) {
    for (const key of this.data.keys()) {
      if (key.startsWith(prefix)) {
        this.data.delete(key);
        this.timestamp.delete(key);
      }
    }
  },

  clear() {
    this.data.clear();
    this.timestamp.clear();
  }
};

// Utilidad para obtener la URL base de API
const getApiUrl = () => {
  return dev || pro || '/api';
};

// OBTENER DETALLES DE CLASES
export const detailsClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DETAILS_REQUEST });

    if (!id) {
      throw new Error('ID de usuario no disponible');
    }

    // Verificar caché
    const cacheKey = `class_details_${id}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_DETAILS_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    const endpoint = dev
      ? `${apiUrl}/clase/show-by-docente/${id}`
      : `${apiUrl}/clases/docente/${id}`;

    const { data } = await axios.get(endpoint);

    dispatch({
      type: CLASS_DETAILS_SUCCESS,
      payload: data
    });

    // Guardar en caché
    responseCache.set(cacheKey, data);

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al obtener detalles de clases';

    dispatch({
      type: CLASS_DETAILS_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// CREAR CLASE (versión unificada que acepta ambos formatos)
export const createClass =
  (...args) =>
  async (dispatch) => {
    try {
      dispatch({ type: CLASS_CREATE_REQUEST });

      let requestData;
      const apiUrl = getApiUrl();

      // Detectar formato de parámetros
      if (args.length >= 4 && typeof args[0] === 'string') {
        // Formato nuevo: (clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin)
        const [clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin] =
          args;

        if (
          !clas_asig_id ||
          !clas_fecha ||
          !clas_hora_inicio ||
          !clas_hora_fin
        ) {
          throw new Error('Todos los campos son requeridos');
        }

        requestData = {
          clas_asig_id,
          clas_fecha,
          clas_hora_inicio,
          clas_hora_fin
        };
      } else {
        // Formato anterior: (subject, date, startTime, endTime, tema)
        const [subject, date, startTime, endTime, tema = ''] = args;

        if (!subject || !date || !startTime || !endTime) {
          throw new Error('Todos los campos son requeridos');
        }

        const formattedDate =
          date instanceof Date
            ? `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date
                .getDate()
                .toString()
                .padStart(2, '0')}`
            : date;

        requestData = {
          asignatura_id: subject,
          fecha: formattedDate,
          hora_inicio: startTime,
          hora_fin: endTime,
          tema: tema
        };
      }

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const endpoint = dev ? `${apiUrl}/clase/create` : `${apiUrl}/clases`;

      const { data } = await axios.post(endpoint, requestData, config);

      dispatch({
        type: CLASS_CREATE_SUCCESS,
        payload: data
      });

      // Invalidar caché relacionada
      responseCache.invalidateByPrefix('class_');

      return { success: true, data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear la clase';

      dispatch({
        type: CLASS_CREATE_FAIL,
        payload: errorMessage
      });

      return { error: { message: errorMessage } };
    }
  };

// MOSTRAR CLASE (para asistencia)
export const showClass = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SHOW_REQUEST });

    // Verificar caché
    const cacheKey = `class_show_${slug}_${id}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_SHOW_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    const { data } = await axios.get(
      `${apiUrl}/asistencia/show-asistencia/${slug}/${id}`
    );

    dispatch({
      type: CLASS_SHOW_SUCCESS,
      payload: data
    });

    // Guardar en caché
    responseCache.set(cacheKey, data);

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al mostrar la clase';

    dispatch({
      type: CLASS_SHOW_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// MOSTRAR FIRMA DE CLASE
export const showClassSignature = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SIGNATURE_REQUEST });

    // Verificar caché
    const cacheKey = `class_signature_${slug}_${id}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_SIGNATURE_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    const { data } = await axios.get(`${apiUrl}/clase/show/${slug}/${id}`);

    dispatch({
      type: CLASS_SIGNATURE_SUCCESS,
      payload: data
    });

    // Guardar en caché
    responseCache.set(cacheKey, data);

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al mostrar la firma de la clase';

    dispatch({
      type: CLASS_SIGNATURE_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// MOSTRAR QR DE CLASE
export const showClassQr = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_QR_REQUEST });

    // Verificar caché
    const cacheKey = `class_qr_${id}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_QR_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    const { data } = await axios.get(`${apiUrl}/clase/show-qr/${id}`);

    dispatch({
      type: CLASS_QR_SUCCESS,
      payload: data
    });

    // Guardar en caché
    responseCache.set(cacheKey, data);

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al mostrar el QR de la clase';

    dispatch({
      type: CLASS_QR_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// MOSTRAR CLASES DEL DÍA
export const showClassDay = (date, userInfo) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DAY_REQUEST });

    if (!userInfo?.user?.user_id) {
      throw new Error('Información de usuario no disponible');
    }

    // Verificar caché
    const cacheKey = `class_day_${date}_${userInfo.user.user_id}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_DAY_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    let endpoint, responseData;

    if (dev) {
      // Endpoint nuevo con rango
      endpoint = `${apiUrl}/clase/dia-rango?fecha=${date}&rangoHoras=6&docenteId=${userInfo.user.user_id}`;
      const { data } = await axios.get(endpoint);
      responseData = data.clases;
    } else {
      // Endpoint anterior
      endpoint = `${apiUrl}/clases/dia/${date}/${userInfo.user.user_id}`;
      const { data } = await axios.get(endpoint);
      responseData = data;
    }

    dispatch({
      type: CLASS_DAY_SUCCESS,
      payload: responseData
    });

    // Guardar en caché
    responseCache.set(cacheKey, responseData);

    return { success: true, data: responseData };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al obtener clases del día';

    dispatch({
      type: CLASS_DAY_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// CANCELAR CLASE
export const cancelClassStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_CANCEL_REQUEST });

    if (!id) {
      throw new Error('ID de clase no disponible');
    }

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const apiUrl = getApiUrl();
    let endpoint,
      requestData = {};

    if (dev) {
      // Endpoint nuevo
      endpoint = `${apiUrl}/clase/cancel/${id}`;
      requestData = { clas_estado: 'finalizada' };
    } else {
      // Endpoint anterior
      endpoint = `${apiUrl}/clases/cancelar/${id}`;
    }

    const { data } = await axios.put(endpoint, requestData, config);

    dispatch({
      type: CLASS_CANCEL_SUCCESS,
      payload: data
    });

    // Invalidar caché relacionada
    responseCache.invalidateByPrefix('class_');

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al cancelar la clase';

    dispatch({
      type: CLASS_CANCEL_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// MOSTRAR TODAS LAS CLASES
export const showClassAll = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_ALL_REQUEST });

    if (!userInfo?.user?.user_id) {
      throw new Error('Información de usuario no disponible');
    }

    // Verificar caché
    const cacheKey = `class_all_${userInfo.user.user_id}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_ALL_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    const endpoint = dev
      ? `${apiUrl}/clase/show-all-docente/${userInfo.user.user_id}`
      : `${apiUrl}/clases/all/${userInfo.user.user_id}`;

    const { data } = await axios.get(endpoint);

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    dispatch({
      type: CLASS_ALL_SUCCESS,
      payload: data
    });

    // Guardar en caché
    responseCache.set(cacheKey, data);

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al obtener todas las clases';

    dispatch({
      type: CLASS_ALL_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// OBTENER CLASES POR DÍA Y RANGO (función auxiliar)
export const getClasesPorDiaYRango =
  (fecha, rangoHoras, docenteId) => async (dispatch) => {
    try {
      dispatch({ type: CLASS_DAY_REQUEST });

      // Verificar caché
      const cacheKey = `class_day_range_${fecha}_${rangoHoras}_${docenteId}`;
      const cachedData = responseCache.get(cacheKey);

      if (cachedData) {
        dispatch({
          type: CLASS_DAY_SUCCESS,
          payload: cachedData
        });
        return { success: true, data: cachedData };
      }

      const apiUrl = getApiUrl();
      const { data } = await axios.get(
        `${apiUrl}/clase/dia-rango?fecha=${fecha}&rangoHoras=${rangoHoras}&docenteId=${docenteId}`
      );

      dispatch({
        type: CLASS_DAY_SUCCESS,
        payload: data.clases
      });

      // Guardar en caché
      responseCache.set(cacheKey, data.clases);

      return { success: true, data: data.clases };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al obtener clases por día y rango';

      dispatch({
        type: CLASS_DAY_FAIL,
        payload: errorMessage
      });

      return { error: { message: errorMessage } };
    }
  };

// OBTENER CLASES POR DOCENTE (función auxiliar)
export const getClasesPorDocente = (docenteId) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_ALL_REQUEST });

    // Verificar caché
    const cacheKey = `class_docente_${docenteId}`;
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      dispatch({
        type: CLASS_ALL_SUCCESS,
        payload: cachedData
      });
      return { success: true, data: cachedData };
    }

    const apiUrl = getApiUrl();
    const { data } = await axios.get(
      `${apiUrl}/clase/show-all-docente/${docenteId}`
    );

    dispatch({
      type: CLASS_ALL_SUCCESS,
      payload: data
    });

    // Guardar en caché
    responseCache.set(cacheKey, data);

    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al obtener clases por docente';

    dispatch({
      type: CLASS_ALL_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};

// UTILIDADES ADICIONALES

// Limpiar toda la caché
export const clearClassCache = () => {
  responseCache.clear();
};

// Invalidar caché por prefijo específico
export const invalidateClassCache = (prefix = 'class_') => {
  responseCache.invalidateByPrefix(prefix);
};
