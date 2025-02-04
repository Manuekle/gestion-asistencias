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
  CLASS_QR_SUCCESS,
  CLASS_QR_FAIL
} from '../constants/classConstants';

// DETAILS
export const detailsClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/docente/${id}`);

    dispatch({
      type: CLASS_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_DETAILS_FAIL,
      payload: error.response.data.message
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
        `http://localhost:4000/clase/nueva`,
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
        payload: error.response.data.message
      });
    }
  };

// SHOW CLASS
export const showClass = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SHOW_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/asistencia/${slug}/${id}`
    );

    dispatch({
      type: CLASS_SHOW_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_SHOW_FAIL,
      payload: error.response.data.message
    });
  }
};

// SHOW SIGNATURE
export const showClassSignature = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SIGNATURE_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/clase/${slug}/${id}`
    );

    dispatch({
      type: CLASS_SIGNATURE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_SIGNATURE_FAIL,
      payload: error.response.data.message
    });
  }
};

// SHOW QR
export const showClassQr = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_SIGNATURE_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/claseQr/${id}`);

    dispatch({
      type: CLASS_QR_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_QR_FAIL,
      payload: error.response.data.message
    });
  }
};
