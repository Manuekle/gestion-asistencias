/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

import {
  ATTENDANCE_CREATE_REQUEST,
  ATTENDANCE_CREATE_SUCCESS,
  ATTENDANCE_CREATE_FAIL
} from '../constants/attendanceConstants';

const dev = process.env.API_DEVELOPMENT;
const pro = process.env.API_PRODUCTION;

//* CREATE
export const createAttendance =
  (estu_id, clas_id, qr_url) => async (dispatch) => {
    try {
      dispatch({
        type: ATTENDANCE_CREATE_REQUEST
      });

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `${dev}/asistencia/create`,
        {
          estu_id,
          clas_id,
          qr_url
        },
        config
      );
      dispatch({
        type: ATTENDANCE_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ATTENDANCE_CREATE_FAIL,
        payload: error.response.data
      });
    }
  };
