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
  USER_RECOVER_REQUEST,
  USER_RECOVER_SUCCESS,
  USER_RECOVER_FAIL,
} from "../constants/userConstants";

import {
  DOCENTE_LOGIN_REQUEST,
  DOCENTE_LOGIN_SUCCESS,
  DOCENTE_LOGIN_FAIL,
  DOCENTE_LOGOUT,
  DOCENTE_REGISTER_REQUEST,
  DOCENTE_REGISTER_SUCCESS,
  DOCENTE_REGISTER_FAIL,
} from "../constants/docenteConstants";

import {
  ESTUDIANTE_LOGIN_REQUEST,
  ESTUDIANTE_LOGIN_SUCCESS,
  ESTUDIANTE_LOGIN_FAIL,
  ESTUDIANTE_LOGOUT,
  ESTUDIANTE_REGISTER_REQUEST,
  ESTUDIANTE_REGISTER_SUCCESS,
  ESTUDIANTE_REGISTER_FAIL,
} from "../constants/estudianteConstants";

// GLOBAL
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case DOCENTE_LOGIN_REQUEST:
      return { loading: true };

    case ESTUDIANTE_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case DOCENTE_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case ESTUDIANTE_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case DOCENTE_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case ESTUDIANTE_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    case DOCENTE_LOGOUT:
      return {};

    case ESTUDIANTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    case DOCENTE_REGISTER_REQUEST:
      return { loading: true };

    case DOCENTE_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case DOCENTE_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case DOCENTE_LOGOUT:
      return {};

    case ESTUDIANTE_REGISTER_REQUEST:
      return { loading: true };

    case ESTUDIANTE_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case ESTUDIANTE_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case ESTUDIANTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRecoverReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RECOVER_REQUEST:
      return { loading: true };

    case USER_RECOVER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_RECOVER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};
