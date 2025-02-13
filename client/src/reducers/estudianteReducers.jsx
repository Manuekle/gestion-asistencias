import {
  ESTUDIANTE_LOGIN_REQUEST,
  ESTUDIANTE_LOGIN_SUCCESS,
  ESTUDIANTE_LOGIN_FAIL,
  ESTUDIANTE_LOGOUT,
  ESTUDIANTE_REGISTER_REQUEST,
  ESTUDIANTE_REGISTER_SUCCESS,
  ESTUDIANTE_REGISTER_FAIL,
  ESTUDIANTE_DETAILS_REQUEST,
  ESTUDIANTE_DETAILS_SUCCESS,
  ESTUDIANTE_DETAILS_FAIL,
  ESTUDIANTE_DETAILS_RESET,
  ESTUDIANTE_RECOVER_REQUEST,
  ESTUDIANTE_RECOVER_SUCCESS,
  ESTUDIANTE_RECOVER_FAIL
} from '../constants/estudianteConstants';

export const estudianteLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ESTUDIANTE_LOGIN_REQUEST:
      return { loading: true };

    case ESTUDIANTE_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case ESTUDIANTE_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case ESTUDIANTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const estudianteRegisterReducer = (state = {}, action) => {
  switch (action.type) {
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
