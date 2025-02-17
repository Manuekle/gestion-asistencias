import {
  CLASS_DETAILS_REQUEST,
  CLASS_DETAILS_SUCCESS,
  CLASS_DETAILS_FAIL,
  CLASS_CREATE_REQUEST,
  CLASS_CREATE_SUCCESS,
  CLASS_CREATE_FAIL,
  CLASS_CREATE_RESET,
  CLASS_SHOW_REQUEST,
  CLASS_SHOW_SUCCESS,
  CLASS_SHOW_FAIL,
  CLASS_SIGNATURE_REQUEST,
  CLASS_SIGNATURE_SUCCESS,
  CLASS_SIGNATURE_FAIL,
  CLASS_QR_REQUEST,
  CLASS_QR_SUCCESS,
  CLASS_QR_FAIL,
  CLASS_CANCEL_REQUEST,
  CLASS_CANCEL_SUCCESS,
  CLASS_CANCEL_FAIL,
  CLASS_DAY_REQUEST,
  CLASS_DAY_SUCCESS,
  CLASS_DAY_FAIL,
  CLASS_ALL_SUCCESS,
  CLASS_ALL_REQUEST,
  CLASS_ALL_FAIL
} from '../constants/classConstants';

// DETAILS
export const classDetailsReducer = (state = { clases: [] }, action) => {
  switch (action.type) {
    case CLASS_DETAILS_REQUEST:
      return { loading: true, ...state };

    case CLASS_DETAILS_SUCCESS:
      return { loading: false, clases: action.payload };

    case CLASS_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// CREATE
export const classCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASS_CREATE_REQUEST:
      return { loading: true };

    case CLASS_CREATE_SUCCESS:
      return { loading: false, success: true, clase: action.payload };

    case CLASS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case CLASS_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// SHOW CLASS
export const classShowReducer = (state = { show: [] }, action) => {
  switch (action.type) {
    case CLASS_SHOW_REQUEST:
      return { loading: true, ...state };

    case CLASS_SHOW_SUCCESS:
      return { loading: false, show: action.payload };

    case CLASS_SHOW_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// SHOW SIGNATURE
export const classSignatureReducer = (state = { signature: [] }, action) => {
  switch (action.type) {
    case CLASS_SIGNATURE_REQUEST:
      return { loading: true, ...state };

    case CLASS_SIGNATURE_SUCCESS:
      return { loading: false, signature: action.payload };

    case CLASS_SIGNATURE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// SHOW QR
export const classQrReducer = (state = { codigo: [] }, action) => {
  switch (action.type) {
    case CLASS_QR_REQUEST:
      return { loading: true, ...state };

    case CLASS_QR_SUCCESS:
      return { loading: false, codigo: action.payload };

    case CLASS_QR_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// CANCEL
export const cancelClassStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASS_CANCEL_REQUEST:
      return { loading: true };

    case CLASS_CANCEL_SUCCESS:
      return { loading: false, success: true };

    case CLASS_CANCEL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// SHOW CLASS DAY
export const classDayReducer = (state = { day: [] }, action) => {
  switch (action.type) {
    case CLASS_DAY_REQUEST:
      return { loading: true, ...state };

    case CLASS_DAY_SUCCESS:
      return { loading: false, day: action.payload };

    case CLASS_DAY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// SHOW ALL CLASS DAY
export const classAllReducer = (state = { all: [] }, action) => {
  switch (action.type) {
    case CLASS_ALL_REQUEST:
      return { loading: true, ...state };

    case CLASS_ALL_SUCCESS:
      return { loading: false, all: action.payload };

    case CLASS_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
