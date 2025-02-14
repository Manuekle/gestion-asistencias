import {
  DOCENTE_LOGOUT,
  DOCENTE_DETAILS_REQUEST,
  DOCENTE_DETAILS_SUCCESS,
  DOCENTE_DETAILS_FAIL,
  DOCENTE_DETAILS_RESET,
  DOCENTE_RECOVER_REQUEST,
  DOCENTE_RECOVER_SUCCESS,
  DOCENTE_RECOVER_FAIL
} from '../constants/docenteConstants';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL
} from '../constants/userConstants';

export const docenteLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case DOCENTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const docenteRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case DOCENTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const docenteRecoverReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCENTE_RECOVER_REQUEST:
      return { loading: true };

    case DOCENTE_RECOVER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case DOCENTE_RECOVER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const docenteDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DOCENTE_DETAILS_REQUEST:
      return { ...state, loading: true };

    case DOCENTE_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case DOCENTE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case DOCENTE_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};
