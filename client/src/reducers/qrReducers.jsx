/* eslint-disable import/prefer-default-export */
import {
  QR_CREATE_REQUEST,
  QR_CREATE_SUCCESS,
  QR_CREATE_FAIL,
  QR_CREATE_RESET
} from '../constants/qrConstants';

// CREATE
export const qrCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QR_CREATE_REQUEST:
      return { loading: true };

    case QR_CREATE_SUCCESS:
      return { loading: false, success: true, codigo: action.payload };

    case QR_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case QR_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
