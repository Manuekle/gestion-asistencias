/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import {
  ASSIGMENT_DETAILS_REQUEST,
  ASSIGMENT_DETAILS_SUCCESS,
  ASSIGMENT_DETAILS_FAIL
} from '../constants/assigmentConstants';

const dev = import.meta.env.VITE_REACT_APP_APP_API_DEVELOPMENT;
const pro = import.meta.env.VITE_VITE_REACT_APP_API_PRODUCTION;

//* DETAILS
export const detailsAssigment = (id) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGMENT_DETAILS_REQUEST });

    const { data } = await axios.get(`${dev}/asignatura/show-by-docente/${id}`);

    dispatch({
      type: ASSIGMENT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ASSIGMENT_DETAILS_FAIL,
      payload: error.response.data
    });
  }
};
