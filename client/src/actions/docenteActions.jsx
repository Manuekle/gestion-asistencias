/* eslint-disable camelcase */
import axios from 'axios';
import {
  DOCENTE_LOGIN_REQUEST,
  DOCENTE_LOGIN_SUCCESS,
  DOCENTE_LOGIN_FAIL,
  DOCENTE_LOGOUT,
  DOCENTE_REGISTER_REQUEST,
  DOCENTE_REGISTER_SUCCESS,
  DOCENTE_REGISTER_FAIL,
  DOCENTE_DETAILS_REQUEST,
  DOCENTE_DETAILS_SUCCESS,
  DOCENTE_DETAILS_FAIL,
  DOCENTE_DETAILS_RESET,
  DOCENTE_LIST_RESET,
  DOCENTE_RECOVER_REQUEST,
  DOCENTE_RECOVER_SUCCESS,
  DOCENTE_RECOVER_FAIL
} from '../constants/docenteConstants';

export const docenteLogin = (doc_correo, doc_password) => async (dispatch) => {
  try {
    dispatch({
      type: DOCENTE_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.post(
      'http://localhost:4000/api/docente/login',
      { doc_correo, doc_password },
      config
    );

    dispatch({
      type: DOCENTE_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCENTE_LOGIN_FAIL,
      payload: error.response.data.message
    });
  }
};

export const docenteLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: DOCENTE_LOGOUT });
  dispatch({ type: DOCENTE_DETAILS_RESET });
  dispatch({ type: DOCENTE_LIST_RESET });
};

export const docenteRegister =
  (doc_nombre, doc_correo, doc_password, rol, doc_estado) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DOCENTE_REGISTER_REQUEST
      });

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/docente/register',
        { doc_nombre, doc_correo, doc_password, rol, doc_estado },
        config
      );

      dispatch({
        type: DOCENTE_REGISTER_SUCCESS,
        payload: data
      });

      dispatch({
        type: DOCENTE_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: DOCENTE_REGISTER_FAIL,
        payload: error.response.data.message
      });
    }
  };

export const docenteRecoverPassword = (doc_correo) => async (dispatch) => {
  try {
    dispatch({
      type: DOCENTE_RECOVER_REQUEST
    });

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.post(
      'http://localhost:4000/api/docente/recover',
      { doc_correo },
      config
    );

    dispatch({
      type: DOCENTE_RECOVER_SUCCESS,
      payload: data
    });

    dispatch({
      type: DOCENTE_RECOVER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DOCENTE_RECOVER_FAIL,
      payload: error.response.data.message
    });
  }
};

export const getDocenteDetails = (doc_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCENTE_DETAILS_REQUEST
    });

    const {
      DOCENTELogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `http://localhost:4000/api/docente/show/${doc_id}/`,
      config
    );

    dispatch({
      type: DOCENTE_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DOCENTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
