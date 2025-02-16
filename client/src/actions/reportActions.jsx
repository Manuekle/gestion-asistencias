/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

import {
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_CREATE_FAIL
} from '../constants/reportConstants';

const dev = process.env.API_DEVELOPMENT;
const pro = process.env.API_PRODUCTION;

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
        `${dev}/reporte/send`,
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
        payload: error.response.data
      });
    }
  };
