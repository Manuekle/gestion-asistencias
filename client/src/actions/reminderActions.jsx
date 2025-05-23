/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

import {
  REMINDER_CREATE_REQUEST,
  REMINDER_CREATE_SUCCESS,
  REMINDER_CREATE_FAIL
} from '../constants/reminderConstants';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;
const pro = import.meta.env.VITE_REACT_APP_API_PRODUCTION;

// CREATE
export const createReminder = (reminderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMINDER_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    // Formatear los datos según lo espera el backend
    const formattedData = {
      reco_titulo: reminderData.remi_titulo,
      reco_descripcion: reminderData.remi_descripcion,
      reco_fecha_inicio: reminderData.remi_fecha_inicio,
      reco_fecha_fin: reminderData.remi_fecha_fin,
      reco_clas_id: reminderData.clas_id
    };

    const { data } = await axios.post(
      `${dev}/recordatorio/create`,
      formattedData,
      config
    );

    dispatch({
      type: REMINDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: REMINDER_CREATE_FAIL,
      payload: error.response.data
    });
  }
};
