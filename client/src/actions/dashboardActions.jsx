import axios from 'axios';
import {
  DASHBOARD_RESUMEN_REQUEST,
  DASHBOARD_RESUMEN_SUCCESS,
  DASHBOARD_RESUMEN_FAIL
} from '../constants/dashboardConstants';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

export const getDashboardResumen = (userId) => async (dispatch) => {
  try {
    if (!userId) {
      throw new Error('ID de usuario no disponible');
    }

    dispatch({ type: DASHBOARD_RESUMEN_REQUEST });

    const { data } = await axios.get(`${dev}/dashboard/resumen/${userId}`);

    dispatch({
      type: DASHBOARD_RESUMEN_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error en getDashboardResumen:', error);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error al cargar el resumen';

    dispatch({
      type: DASHBOARD_RESUMEN_FAIL,
      payload: errorMessage
    });

    return { error: { message: errorMessage } };
  }
};
