import {
  ESTUDIANTE_DETAILS_REQUEST,
  ESTUDIANTE_DETAILS_SUCCESS,
  ESTUDIANTE_DETAILS_FAIL,
  ESTUDIANTE_DETAILS_RESET,
  ESTUDIANTE_RECOVER_REQUEST,
  ESTUDIANTE_RECOVER_SUCCESS,
  ESTUDIANTE_RECOVER_FAIL
} from '../constants/estudianteConstants';

import {
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL
} from '../constants/userConstants';

export const estudianteLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const estudianteRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const estudianteRecoverReducer = (state = {}, action) => {
  switch (action.type) {
    case ESTUDIANTE_RECOVER_REQUEST:
      return { loading: true };

    case ESTUDIANTE_RECOVER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case ESTUDIANTE_RECOVER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const estudianteDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ESTUDIANTE_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ESTUDIANTE_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case ESTUDIANTE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case ESTUDIANTE_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};
