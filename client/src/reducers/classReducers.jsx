import {
  CLASS_DETAILS_REQUEST,
  CLASS_DETAILS_SUCCESS,
  CLASS_DETAILS_FAIL,
  CLASS_CREATE_REQUEST,
  CLASS_CREATE_SUCCESS,
  CLASS_CREATE_FAIL,
  CLASS_CREATE_RESET
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
