/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
// no-unused-vars
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_RECOVER_REQUEST,
  USER_RECOVER_SUCCESS,
  USER_RECOVER_FAIL
} from '../constants/userConstants';

const dev = process.env.API_DEVELOPMENT;
const pro = process.env.API_PRODUCTION;

export const userLogin = (usua_correo, usua_password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${dev}/usuario/login`,
      { usua_correo: usua_correo, usua_password: usua_password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const userRegister =
  (usua_nombre, usua_correo, usua_password, rol, usua_estado) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST
      });

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const { data } = await axios.post(
         `${dev}/usuario/register`,
        { usua_nombre, usua_correo, usua_password, rol, usua_estado },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data
      });
    }
  };

export const userRecoverPassword = (usua_correo) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RECOVER_REQUEST
    });

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${dev}/usuario/recover`,
      { usua_correo },
      config
    );

    dispatch({
      type: USER_RECOVER_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_RECOVER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_RECOVER_FAIL,
      payload: error.response.data
    });
  }
};

export const getUserDetails = (usua_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${dev}/usuario/show/${usua_id}/`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
