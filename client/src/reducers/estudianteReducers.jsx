import {
  ESTUDIANTE_LIST_REQUEST,
  ESTUDIANTE_LIST_SUCCESS,
  ESTUDIANTE_LIST_FAIL,
  ESTUDIANTE_DETAILS_REQUEST,
  ESTUDIANTE_DETAILS_SUCCESS,
  ESTUDIANTE_DETAILS_FAIL,
  ESTUDIANTE_CREATE_REQUEST,
  ESTUDIANTE_CREATE_SUCCESS,
  ESTUDIANTE_CREATE_FAIL,
  ESTUDIANTE_UPDATE_REQUEST,
  ESTUDIANTE_UPDATE_SUCCESS,
  ESTUDIANTE_UPDATE_FAIL,
  ESTUDIANTE_DELETE_REQUEST,
  ESTUDIANTE_DELETE_SUCCESS,
  ESTUDIANTE_DELETE_FAIL
} from '../constants/estudianteConstants';

export const estudianteListReducer = (state = { estudiantes: [] }, action) => {
  switch (action.type) {
    case ESTUDIANTE_LIST_REQUEST:
      return { loading: true, estudiantes: [] };
    case ESTUDIANTE_LIST_SUCCESS:
      return { loading: false, estudiantes: action.payload };
    case ESTUDIANTE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const estudianteDetailsReducer = (
  state = { estudiante: {} },
  action
) => {
  switch (action.type) {
    case ESTUDIANTE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ESTUDIANTE_DETAILS_SUCCESS:
      return { loading: false, estudiante: action.payload };
    case ESTUDIANTE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const estudianteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ESTUDIANTE_CREATE_REQUEST:
      return { loading: true };
    case ESTUDIANTE_CREATE_SUCCESS:
      return { loading: false, success: true, estudiante: action.payload };
    case ESTUDIANTE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const estudianteUpdateReducer = (state = { estudiante: {} }, action) => {
  switch (action.type) {
    case ESTUDIANTE_UPDATE_REQUEST:
      return { loading: true };
    case ESTUDIANTE_UPDATE_SUCCESS:
      return { loading: false, success: true, estudiante: action.payload };
    case ESTUDIANTE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const estudianteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ESTUDIANTE_DELETE_REQUEST:
      return { loading: true };
    case ESTUDIANTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ESTUDIANTE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
