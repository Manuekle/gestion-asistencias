/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

import {
  QR_CREATE_REQUEST,
  QR_CREATE_SUCCESS,
  QR_CREATE_FAIL
} from '../constants/qrConstants';

const dev = process.env.API_DEVELOPMENT;
const pro = process.env.API_PRODUCTION;

// CREATE
export const createQR = (codi_valor, codi_clas_id) => async (dispatch) => {
  try {
    dispatch({
      type: QR_CREATE_REQUEST
    });

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${dev}/qr/create`,
      {
        codi_valor,
        codi_clas_id
      },
      config
    );
    dispatch({
      type: QR_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: QR_CREATE_FAIL,
      payload: error.response.data
    });
  }
};
