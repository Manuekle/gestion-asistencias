/* eslint-disable camelcase */
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
  CLASS_CANCEL_REQUEST,
  CLASS_CANCEL_SUCCESS,
  CLASS_CANCEL_FAIL,
  CLASS_DAY_REQUEST,
  CLASS_DAY_SUCCESS,
  CLASS_DAY_FAIL,
  CLASS_ALL_SUCCESS,
  CLASS_ALL_REQUEST,
  CLASS_ALL_FAIL
} from '../constants/classConstants';

// DETAILS
export const detailsClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/clase/show-by-docente/${id}`
    );

    dispatch({
      type: CLASS_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_DETAILS_FAIL,
      payload: error.response.data
    });
  }
};

// CREATE
export const createClass =
  (clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CLASS_CREATE_REQUEST
      });

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `http://localhost:4000/api/clase/create`,
        {
          clas_asig_id,
          clas_fecha,
          clas_hora_inicio,
          clas_hora_fin
        },
        config
      );
      dispatch({
        type: CLASS_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: CLASS_CREATE_FAIL,
        payload: error.response.data
      });
    }
  };

// SHOW CLASS en //*asistencia!!
export const showClass = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SHOW_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/asistencia/show-asistencia/${slug}/${id}`
    );

    dispatch({
      type: CLASS_SHOW_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_SHOW_FAIL,
      payload: error.response.data
    });
  }
};

// SHOW SIGNATURE
export const showClassSignature = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SIGNATURE_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/clase/show/${slug}/${id}`
    );

    dispatch({
      type: CLASS_SIGNATURE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_SIGNATURE_FAIL,
      payload: error.response.data
    });
  }
};

// SHOW QR
export const showClassQr = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_QR_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/clase/show-qr/${id}`
    );

    dispatch({
      type: CLASS_QR_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_QR_FAIL,
      payload: error.response.data
    });
  }
};

// CANCEL
export const cancelClassStatus = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_CANCEL_REQUEST
    });

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/clase/cancel/${id}`,
      {
        clas_estado: 'finalizada'
      },
      config
    );

    dispatch({
      type: CLASS_CANCEL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_CANCEL_FAIL,
      payload: error.response.data
    });
  }
};

// SHOW CLASS DAY
export const showClassDay = (fecha, userInfo) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DAY_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/clase/dia-rango?fecha=${fecha}&rangoHoras=6&docenteId=${userInfo && userInfo.user.user_id}`
    );

    dispatch({
      type: CLASS_DAY_SUCCESS,
      payload: data.clases
    });
  } catch (error) {
    dispatch({
      type: CLASS_DAY_FAIL,
      payload: error.response.data
    });
  }
};

// SHOW CLASS DAY
export const showClassAll = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_ALL_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/clase/show-all-docente/${userInfo && userInfo.user.user_id}`
    );

    dispatch({
      type: CLASS_ALL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_ALL_FAIL,
      payload: error.response.data
    });
  }
};
