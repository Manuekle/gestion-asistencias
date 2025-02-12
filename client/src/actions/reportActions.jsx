/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

import {
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_CREATE_FAIL
} from '../constants/reportConstants';

// CREATE
export const createReport =
  (mes, anio, docenteId, email) => async (dispatch) => {
    try {
      dispatch({
        type: REPORT_CREATE_REQUEST
      });

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `http://localhost:4000/api/reporte/send`,
        {
          mes,
          anio,
          docenteId,
          email
        },
        config
      );
      dispatch({
        type: REPORT_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: REPORT_CREATE_FAIL,
        payload: error.response.data.message
      });
    }
  };
