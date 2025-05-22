import axios from 'axios';
import {
  DASHBOARD_RESUMEN_REQUEST,
  DASHBOARD_RESUMEN_SUCCESS,
  DASHBOARD_RESUMEN_FAIL
} from '../constants/dashboardConstants';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

export const getDashboardResumen = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_RESUMEN_REQUEST });

    const { data } = await axios.get(`${dev}/dashboard/resumen/${userId}`);

    dispatch({
      type: DASHBOARD_RESUMEN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_RESUMEN_FAIL,
      payload: error.response?.data?.message || 'Error al cargar el resumen'
    });
  }
};
