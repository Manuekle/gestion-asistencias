/* eslint-disable import/prefer-default-export */
import {
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_RESET,
} from "../constants/reportConstants";

// CREATE
export const createReportReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_CREATE_REQUEST:
      return { loading: true };

    case REPORT_CREATE_SUCCESS:
      return { loading: false, success: true, reporte: action.payload };

    case REPORT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case REPORT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
