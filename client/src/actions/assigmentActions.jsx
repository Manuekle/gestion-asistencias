/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import {
  ASSIGMENT_DETAILS_REQUEST,
  ASSIGMENT_DETAILS_SUCCESS,
  ASSIGMENT_DETAILS_FAIL
} from '../constants/assigmentConstants';

//* DETAILS
export const detailsAssigment = (id) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGMENT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/asignatura/show-by-docente/${id}`
    );

    dispatch({
      type: ASSIGMENT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ASSIGMENT_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};
