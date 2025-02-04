/* eslint-disable import/prefer-default-export */
import {
  ASSIGMENT_DETAILS_REQUEST,
  ASSIGMENT_DETAILS_SUCCESS,
  ASSIGMENT_DETAILS_FAIL
} from '../constants/assigmentConstants';

// DETAILS
export const assigmentDetailsReducer = (state = { asignatura: [] }, action) => {
  switch (action.type) {
    case ASSIGMENT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ASSIGMENT_DETAILS_SUCCESS:
      return { loading: false, asignatura: action.payload };

    case ASSIGMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
