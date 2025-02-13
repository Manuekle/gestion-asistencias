import {
  DOCENTE_LIST_REQUEST,
  DOCENTE_LIST_SUCCESS,
  DOCENTE_LIST_FAIL,
  DOCENTE_DETAILS_REQUEST,
  DOCENTE_DETAILS_SUCCESS,
  DOCENTE_DETAILS_FAIL,
  DOCENTE_CREATE_REQUEST,
  DOCENTE_CREATE_SUCCESS,
  DOCENTE_CREATE_FAIL,
  DOCENTE_UPDATE_REQUEST,
  DOCENTE_UPDATE_SUCCESS,
  DOCENTE_UPDATE_FAIL,
  DOCENTE_DELETE_REQUEST,
  DOCENTE_DELETE_SUCCESS,
  DOCENTE_DELETE_FAIL
} from '../constants/docenteConstants';

export const docenteListReducer = (state = { docentes: [] }, action) => {
  switch (action.type) {
    case DOCENTE_LIST_REQUEST:
      return { loading: true, docentes: [] };
    case DOCENTE_LIST_SUCCESS:
      return { loading: false, docentes: action.payload };
    case DOCENTE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docenteDetailsReducer = (state = { docente: {} }, action) => {
  switch (action.type) {
    case DOCENTE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case DOCENTE_DETAILS_SUCCESS:
      return { loading: false, docente: action.payload };
    case DOCENTE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docenteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCENTE_CREATE_REQUEST:
      return { loading: true };
    case DOCENTE_CREATE_SUCCESS:
      return { loading: false, success: true, docente: action.payload };
    case DOCENTE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docenteUpdateReducer = (state = { docente: {} }, action) => {
  switch (action.type) {
    case DOCENTE_UPDATE_REQUEST:
      return { loading: true };
    case DOCENTE_UPDATE_SUCCESS:
      return { loading: false, success: true, docente: action.payload };
    case DOCENTE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docenteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCENTE_DELETE_REQUEST:
      return { loading: true };
    case DOCENTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DOCENTE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
