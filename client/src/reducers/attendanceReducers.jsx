/* eslint-disable import/prefer-default-export */
import {
  ATTENDANCE_CREATE_REQUEST,
  ATTENDANCE_CREATE_SUCCESS,
  ATTENDANCE_CREATE_FAIL,
  ATTENDANCE_CREATE_RESET
} from '../constants/attendanceConstants';

// CREATE
export const attendanceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_CREATE_REQUEST:
      return { loading: true };

    case ATTENDANCE_CREATE_SUCCESS:
      return { loading: false, success: true, asistencia: action.payload };

    case ATTENDANCE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case ATTENDANCE_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
