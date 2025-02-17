/* eslint-disable camelcase */
import axios from "axios";
import {
  ESTUDIANTE_REGISTER_FAIL,
  ESTUDIANTE_DETAILS_REQUEST,
  ESTUDIANTE_DETAILS_SUCCESS,
  ESTUDIANTE_DETAILS_FAIL,
  ESTUDIANTE_DETAILS_RESET,
  ESTUDIANTE_LIST_RESET,
  ESTUDIANTE_RECOVER_REQUEST,
  ESTUDIANTE_RECOVER_SUCCESS,
  ESTUDIANTE_RECOVER_FAIL,
} from "../constants/estudianteConstants";

import {
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;
const pro = import.meta.env.VITE_REACT_APP_API_PRODUCTION;

export const estudianteLogin =
  (estu_correo, estu_password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/estudiante/login",
        { estu_correo, estu_password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  };

export const estudianteLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: ESTUDIANTE_LOGOUT });
  dispatch({ type: ESTUDIANTE_DETAILS_RESET });
  dispatch({ type: ESTUDIANTE_LIST_RESET });
};

export const estudianteRegister =
  (estu_nombre, estu_correo, estu_password, rol, estu_estado) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${dev}/estudiante/register`,
        { estu_nombre, estu_correo, estu_password, rol, estu_estado },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data,
      });
    }
  };

export const estudianteRecoverPassword = (estu_correo) => async (dispatch) => {
  try {
    dispatch({
      type: ESTUDIANTE_RECOVER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${dev}/estudiante/recover`,
      { estu_correo },
      config
    );

    dispatch({
      type: ESTUDIANTE_RECOVER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ESTUDIANTE_RECOVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_RECOVER_FAIL,
      payload: error.response.data,
    });
  }
};

export const getEstudianteDetails = (estu_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ESTUDIANTE_DETAILS_REQUEST,
    });

    const {
      estudianteLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${dev}/estudiante/show/${estu_id}/`,
      config
    );

    dispatch({
      type: ESTUDIANTE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
